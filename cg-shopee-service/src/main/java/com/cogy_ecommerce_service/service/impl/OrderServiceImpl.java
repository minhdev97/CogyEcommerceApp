package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.OrderConverter;
import com.cogy_ecommerce_service.converter.OrderDetailConverter;
import com.cogy_ecommerce_service.entity.Order;
import com.cogy_ecommerce_service.entity.OrderDetail;
import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.entity.SellerLocation;
import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.entity.UserLocation;
import com.cogy_ecommerce_service.payload.request.GHTKTransportDetailRequestDTO;
import com.cogy_ecommerce_service.payload.request.ListShippingFeeRequestDTO;
import com.cogy_ecommerce_service.payload.request.OrderDetailRequestDto;
import com.cogy_ecommerce_service.payload.request.OrderDetailToGHTKRequestDTO;
import com.cogy_ecommerce_service.payload.request.OrderRequestDto;
import com.cogy_ecommerce_service.payload.request.OrderToGHTKRequestDTO;
import com.cogy_ecommerce_service.payload.request.PostOrderRequestDTO;
import com.cogy_ecommerce_service.payload.request.ProductToGHTKRequestDTO;
import com.cogy_ecommerce_service.payload.request.ShippingFeeRequestDTO;
import com.cogy_ecommerce_service.payload.response.GHTKShippingFeeDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListGHTKShippingFeeDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListOrderUserResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderFromGHTKResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderHistoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderListBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderUserResponseDTO;
import com.cogy_ecommerce_service.repository.OrderRepository;
import com.cogy_ecommerce_service.repository.SellerRepository;
import com.cogy_ecommerce_service.repository.UserLocationRepository;
import com.cogy_ecommerce_service.repository.UserRepository;
import com.cogy_ecommerce_service.service.OrderService;
import com.cogy_ecommerce_service.service.OrderToDeliveryService;
import com.cogy_ecommerce_service.service.SellerService;
import com.cogy_ecommerce_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final SellerService sellerService;

    private final UserService userService;

    private final OrderToDeliveryService orderToDeliveryService;

    private final OrderRepository orderRepository;

    private final OrderConverter orderConverter;

    private final OrderDetailConverter orderDetailConverter;

    private final UserLocationRepository userLocationRepository;


    private final SellerRepository sellerRepository;

    private final UserRepository userRepository;


    @Override
    public OrderListBoResponseDTO findBySellerIdAndStatus(String sellerId, String status) {
        Seller seller = sellerService.findById(sellerId);
        List<Order> orderList = new ArrayList<>();
        if (status == null) {
            orderList.addAll(seller.getOrders());
        } else {
            List<Order> orderListDtb = orderRepository.findByStatusAndSeller(Order.Status.valueOf(status.toUpperCase()), seller);
            orderList.addAll(orderListDtb);
        }
        List<OrderBoResponseDTO> responseDTOList = orderConverter.convertListEntityToListBoResponse(orderList);
        return new OrderListBoResponseDTO(responseDTOList);
    }


    @Override
    public OrderBoResponseDTO postOrderToDeliveryService(String sellerId, PostOrderRequestDTO requestDTO) {
        Seller seller = sellerService.findById(sellerId);
        Order order = orderRepository
                .findByIdAndSeller(UUID.fromString(requestDTO.getOrderId()), seller)
                .orElseThrow(IllegalArgumentException::new);
        User buyer = order.getBuyer();
        UserLocation buyerLocation = buyer.getLocations().stream().filter(UserLocation::isDefaultAddress).findFirst().orElseThrow();
        SellerLocation sellerLocation;
        if (requestDTO.getSellerLocationId() == null) {
            sellerLocation = seller.getLocations().stream()
                    .filter(SellerLocation::isDefaultAddress)
                    .findFirst().orElseThrow(IllegalArgumentException::new);
        } else {
            sellerLocation = seller.getLocations().stream()
                    .filter(location -> Objects.equals(location.getId().toString(), requestDTO.getSellerLocationId()))
                    .findFirst().orElseThrow(IllegalArgumentException::new);
        }
        assert sellerLocation != null;
        if (order.getDeliveryService() == Order.DeliveryService.GHTK) {
            List<ProductToGHTKRequestDTO> products = orderDetailConverter.convertListEntityToListGHTKRequestDTO(order.getOrderDetails());
            OrderDetailToGHTKRequestDTO orderToPost = OrderDetailToGHTKRequestDTO
                    .builder()
                    .id(order.getId().toString())
                    .pick_name(sellerLocation.getDeputyName())
                    .pick_money((order.getTotalPrice().intValue() + order.getShippingFee().intValue()))
                    .pick_address(sellerLocation.getAddress())
                    .pick_province(sellerLocation.getProvince())
                    .pick_district(sellerLocation.getDistrict())
                    .pick_ward(sellerLocation.getWard())
                    .pick_tel(sellerLocation.getPhoneNumber())
                    .name(buyer.getFullName())
                    .address(buyerLocation.getAddress())
                    .province(buyerLocation.getProvince())
                    .district(buyerLocation.getDistrict())
                    .ward(buyerLocation.getWard())
                    .hamlet((buyerLocation.getHamlet() == null || buyerLocation.getHamlet().equals(""))
                            ? "Khác"
                            : buyerLocation.getHamlet()
                    )
                    .tel(buyerLocation.getPhoneNumber())
                    .email(buyer.getEmail())
                    .weight_option("gram")
                    .value(order.getTotalPrice().intValue())
                    .pick_option(requestDTO.isSellerBringGoodsToPostOffice() ? "post" : "cod")
                    .is_freeship(1)
                    .build();
            OrderToGHTKRequestDTO orderToGHTKRequestDTO = OrderToGHTKRequestDTO
                    .builder()
                    .products(products)
                    .order(orderToPost)
                    .build();
            OrderFromGHTKResponseDTO orderGHTKResponse = orderToDeliveryService.postOrderToGHTKDeliveryService(orderToGHTKRequestDTO);
            order.setStatus(Order.Status.PENDING);
            order.setDeliveryTrackingCode(orderGHTKResponse.getLabel());
            Order orderResponse = orderRepository.save(order);
            return orderConverter.convertEntityToBoResponse(orderResponse);
        } else {
            return null;
        }
    }

    @Override
    public List<OrderHistoryResponseDTO> save(OrderRequestDto orderRequestDto) {
        List<OrderRequestDto> OrdersGroupBySellerList =  groupOrderBySeller(orderRequestDto);
        List<OrderHistoryResponseDTO> orderHistoryResponseDTOList = new ArrayList<>();
        for (OrderRequestDto requestDto : OrdersGroupBySellerList) {
            Order newOrder = orderConverter.convertRequestToEntity(requestDto);
            User buyer = userRepository.findById(UUID.fromString(requestDto.getBuyerID()))
                    .orElseThrow(IllegalArgumentException::new);
            newOrder.setBuyer(buyer);
            Seller seller = sellerRepository.findById(UUID.fromString(requestDto.getSellerID()))
                    .orElseThrow(IllegalArgumentException::new);
            newOrder.setSeller(seller);
            newOrder.setRequestTime(LocalDateTime.now());
            newOrder.setShippingFee(0.0);
            newOrder.setCogyOrderCode(generateCogyOrderCode(newOrder.getId()));
            for (OrderDetail orderDetail : newOrder.getOrderDetails()) {
                orderDetail.setId(UUID.randomUUID());
                orderDetail.setOrder(newOrder);
            }
            orderRepository.save(newOrder);
            orderHistoryResponseDTOList.add(orderConverter.convertEntityToHistoryOrderResponse(newOrder));

        }
        return orderHistoryResponseDTOList;
    }

    private String generateCogyOrderCode(UUID orderId) {
        Date now = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMddHHmmss");
        String formattedNow = dateFormat.format(now);
        return formattedNow + orderId.toString().substring(0, 8);
    }

    @Override
    public List<OrderRequestDto> groupOrderBySeller(OrderRequestDto orderRequestDto) {
        Map<UUID, OrderRequestDto> orderRequestDtoMap = new HashMap<>();

        for (OrderDetailRequestDto orderDetailRequestDto : orderRequestDto.getOrderDetailRequestDtoList()) {
            UUID sellerId = UUID.fromString(orderDetailRequestDto.getSellerID());

            OrderRequestDto subOrderBySeller = orderRequestDtoMap.get(sellerId);
            if (subOrderBySeller == null) {
                subOrderBySeller = new OrderRequestDto();
                subOrderBySeller.setBuyerID(orderRequestDto.getBuyerID());
                subOrderBySeller.setSellerID(sellerId.toString());
                subOrderBySeller.setStatus(orderRequestDto.getStatus());
                subOrderBySeller.setDeliveryService(orderRequestDto.getDeliveryService());
                subOrderBySeller.setOrderDetailRequestDtoList(new ArrayList<>());
                orderRequestDtoMap.put(sellerId, subOrderBySeller);
            }
            subOrderBySeller.getOrderDetailRequestDtoList().add(orderDetailRequestDto);

            double totalPrice = subOrderBySeller.getTotalPrice() != null ? subOrderBySeller.getTotalPrice() : 0.0;

            totalPrice += orderDetailRequestDto.getQuantity() *  orderDetailRequestDto.getPrice();

            subOrderBySeller.setTotalPrice(totalPrice);

        }

        return new ArrayList<>(orderRequestDtoMap.values());
    }

    @Override
    public ListGHTKShippingFeeDetailResponseDTO getShippingFee(ListShippingFeeRequestDTO requestListDTO) {
        List<GHTKShippingFeeDetailResponseDTO> listResponse = new ArrayList<>();
        for (ShippingFeeRequestDTO requestDTO : requestListDTO.getListRequest()) {
            Seller seller = sellerService.findByName(requestDTO.getShopName());
            SellerLocation sellerLocation = seller.getLocations()
                    .stream().filter(SellerLocation::isDefaultAddress)
                    .findFirst()
                    .orElseThrow(RuntimeException::new);
            UserLocation userLocation = userLocationRepository.findById(UUID.fromString(requestDTO.getUserLocationId()))
                    .orElseThrow(IllegalArgumentException::new);
            GHTKTransportDetailRequestDTO transportDetailRequestDTO = GHTKTransportDetailRequestDTO
                    .builder()
                    .deliver_option("none")
                    .weight(requestDTO.getTotalWeight())
                    .address(userLocation.getAddress())
                    .ward(userLocation.getWard())
                    .district(userLocation.getDistrict())
                    .province(userLocation.getProvince())
                    .pick_address(sellerLocation.getAddress())
                    .pick_ward(sellerLocation.getWard())
                    .pick_district(sellerLocation.getDistrict())
                    .pick_province(sellerLocation.getProvince())
                    .build();
            GHTKShippingFeeDetailResponseDTO responseDTO = orderToDeliveryService
                    .getShippingFeeByGHTKDeliveryService(transportDetailRequestDTO);
//            responseDTO.setShopName(seller.getName());
            listResponse.add(responseDTO);
        }
        return new ListGHTKShippingFeeDetailResponseDTO(listResponse);
    }

    @Override
    public ListOrderUserResponseDTO findByUserIdAndStatus(String id, String status) {
        User user = userService.findById(id);
        List<Order> orderList = new ArrayList<>();
        if (status == null) {
            orderList.addAll(user.getOrders());
        } else {
            List<Order> orderListDtb = orderRepository.findByStatusAndBuyer(Order.Status.valueOf(status.toUpperCase()), user);
            orderList.addAll(orderListDtb);
        }
        List<OrderUserResponseDTO> responseDTOList = orderConverter.convertListEntityToListOrderUserResponse(orderList);
        return new ListOrderUserResponseDTO(responseDTOList);
    }
}
