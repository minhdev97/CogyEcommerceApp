package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.configuration.EnvVariable;
import com.cogy_ecommerce_service.converter.PhotoConverter;
import com.cogy_ecommerce_service.converter.ProductConverter;
import com.cogy_ecommerce_service.converter.SubCategoryConverter;
import com.cogy_ecommerce_service.converter.VariantConverter;
import com.cogy_ecommerce_service.converter.VoucherConverter;
import com.cogy_ecommerce_service.entity.Color;
import com.cogy_ecommerce_service.entity.Photo;
import com.cogy_ecommerce_service.entity.Product;
import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.entity.Size;
import com.cogy_ecommerce_service.entity.SubCategory;
import com.cogy_ecommerce_service.entity.Variant;
import com.cogy_ecommerce_service.entity.Voucher;
import com.cogy_ecommerce_service.payload.request.RequestProductDTO;
import com.cogy_ecommerce_service.payload.request.VariantRequestDTO;
import com.cogy_ecommerce_service.payload.response.CategoryProductPageResponseDTO;
import com.cogy_ecommerce_service.payload.response.HomeProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListHomeProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.ManagementProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.PageResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProductDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProductToCreateVoucherDTO;
import com.cogy_ecommerce_service.payload.response.ProductToEditResponseDTO;
import com.cogy_ecommerce_service.payload.response.RelatedProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.SearchResponseDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.VoucherProductDetailDTO;
import com.cogy_ecommerce_service.repository.ColorRepository;
import com.cogy_ecommerce_service.repository.PhotoRepository;
import com.cogy_ecommerce_service.repository.ProductRepository;
import com.cogy_ecommerce_service.repository.SizeRepository;
import com.cogy_ecommerce_service.repository.StatusRepository;
import com.cogy_ecommerce_service.repository.SubCategoryRepository;
import com.cogy_ecommerce_service.repository.VoucherRepository;
import com.cogy_ecommerce_service.service.ProductService;
import com.cogy_ecommerce_service.service.SellerService;
import com.cogy_ecommerce_service.service.SubCategoryService;
import com.cogy_ecommerce_service.utils.GsonUtils;
import com.cogy_ecommerce_service.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    private final SubCategoryRepository subCategoryRepository;

    private final SizeRepository sizeRepository;

    private final ColorRepository colorRepository;

    private final PhotoRepository photoRepository;

    private final StatusRepository statusRepository;

    private final ProductConverter productConverter;

    private final VariantConverter variantConverter;

    private final PhotoConverter photoConverter;

    private final SubCategoryConverter subCategoryConverter;

    private final SellerService sellerService;

    private final SubCategoryService subCategoryService;

    private final VoucherRepository voucherRepository;

    private final VoucherConverter voucherConverter;

//    private final ValueOperations<String, String> cachedData;
//
//    private final RedisTemplate<String, String> redisTemplate;

    private final GsonUtils<ListHomeProductResponseDTO> gsonUtils;

    private final RedisUtils redisUtils;

    private static final String cacheKeyOf20SuggestProducts = EnvVariable.CACHE_KEY_20_SUGGEST_PRODUCTS;


    @Override
    public ManagementProductResponseDTO create(String sellerId, RequestProductDTO requestDTO) {
        Seller seller = authenticatedSeller(sellerId);
        Product productInput = convertRequestDtoAndSetSubCategoryAndSeller(seller, requestDTO);
        List<VariantRequestDTO> variantRequestDTOList = sortVariantsBySalePrice(requestDTO.getVariants());
        productInput.setMinPriceOfVariants(variantRequestDTOList.get(0).getSalePrice());
        productInput.setMaxPriceOfVariants(variantRequestDTOList.get(variantRequestDTOList.size() - 1).getSalePrice());
        productInput.setCreationTime(LocalDateTime.now());
        List<Photo> photos = photoConverter.convertListRequestToListEntity(requestDTO.getPhotos())
                .stream().peek(photo -> photo.setProduct(productInput)).collect(Collectors.toList());
        productInput.setPhotos(photos);
        List<Variant> variants = variantConverter.convertListRequestToListEntity(variantRequestDTOList)
                .stream().peek(variant -> variant.setProduct(productInput)).collect(Collectors.toList());
        filterColorAndSizeInVariants(variants);
        productInput.setVariants(variants);
        Product originProduct = productRepository.save(productInput);
        return productConverter.convertEntityToResponse(originProduct);
    }


    private void filterColorAndSizeInVariants(List<Variant> variants) {
        Map<String, Size> uniqueNameOfSizes = new HashMap<>();
        Map<String, Color> uniqueNameOfColors = new HashMap<>();
        for (Variant variant : variants) {
            variant.getColor().setActive(true);
            variant.getSize().setActive(true);
            uniqueNameOfSizes.put(variant.getSize().getName(), variant.getSize());
            uniqueNameOfColors.put(variant.getColor().getName(), variant.getColor());
        }
//
//        List<Size> originSizes = sizeRepository.saveAll(uniqueNameOfSizes.values());
//        List<Color> originColors = colorRepository.saveAll(uniqueNameOfColors.values());

        for (Variant variant : variants) {
            for (Size size : uniqueNameOfSizes.values()) {
                if (variant.getSize().getName().equals(size.getName())) {
                    if (size.getId() == null) size.setId(UUID.randomUUID());
                    variant.setSize(size);
                }
            }
            for (Color color : uniqueNameOfColors.values()) {
                if (variant.getColor().getName().equals(color.getName())) {
                    if (color.getId() == null) color.setId(UUID.randomUUID());
                    variant.setColor(color);
                }
            }
        }
    }


    private List<VariantRequestDTO> sortVariantsBySalePrice(List<VariantRequestDTO> variants) {
        variants.sort(Comparator.comparingDouble(VariantRequestDTO::getSalePrice));
        return variants;
    }


    private Product convertRequestDtoAndSetSubCategoryAndSeller(
            Seller seller,
            RequestProductDTO requestProductDTO) {
        Product product = productConverter.convertRequestCreateToEntity(requestProductDTO);
        product.setSubCategory(subCategoryService.findById(requestProductDTO.getSubCategory().getId()));
        product.setSeller(seller);
        return product;
    }


    @Override
    public ManagementProductResponseDTO save(String sellerId, RequestProductDTO requestDTO) {
        Seller seller = authenticatedSeller(sellerId);
        Product product = convertRequestDtoAndSetSubCategoryAndSeller(seller, requestDTO);
        Product productDatabase = productRepository.findById(product.getId())
                .orElseThrow(IllegalArgumentException::new);
        List<VariantRequestDTO> variantRequestDTOList = sortVariantsBySalePrice(requestDTO.getVariants());
        productDatabase.setMinPriceOfVariants(variantRequestDTOList.get(0).getSalePrice());
        productDatabase.setMaxPriceOfVariants(variantRequestDTOList.get(variantRequestDTOList.size() - 1).getSalePrice());
        productDatabase.setSubCategory(product.getSubCategory());
        productDatabase.setDefinitionOfColor(product.getDefinitionOfColor());
        productDatabase.setDefinitionOfSize(product.getDefinitionOfSize());
        productDatabase.setDescription(product.getDescription());
        productDatabase.setImage(product.getImage());
        productDatabase.setName(product.getName());
        productDatabase.setShown(product.isShown());

        List<Photo> photos = photoConverter.convertListRequestToListEntity(requestDTO.getPhotos())
                .stream().peek(photo -> photo.setProduct(productDatabase)).collect(Collectors.toList());
        photoRepository.deleteAll(productDatabase.getPhotos());
        productDatabase.setPhotos(photos);

        List<Variant> variants = variantConverter.convertListRequestToListEntity(variantRequestDTOList)
                .stream().peek(variant -> variant.setProduct(productDatabase)).toList();
        List<Variant> variantInputs = new ArrayList<>(variants);
        List<Variant> variantsDatabase = new ArrayList<>(productDatabase.getVariants());
        List<Variant> variantsToRemove = getVariantsToRemove(variantInputs, variantsDatabase);
        variantInputs.addAll(variantsToRemove);
        filterColorAndSizeInVariants(variantInputs);
        productDatabase.setVariants(variantInputs);

        Product responseProduct = productRepository.save(productDatabase);
        return productConverter.convertEntityToResponse(responseProduct);
    }


    private static List<Variant> getVariantsToRemove(List<Variant> variantInputs, List<Variant> variantsDatabase) {
        List<UUID> variantInputIds = variantInputs.stream().map(Variant::getId).toList();
        variantsDatabase.removeIf(
                variant -> variantInputIds.stream().anyMatch(
                        inputId -> inputId != null && inputId.equals(variant.getId())
                )
        );
        variantInputs.forEach(variantInput -> variantsDatabase.forEach(variantDatabase -> {
            if (Objects.equals(variantDatabase.getSize().getName(), variantInput.getSize().getName())
                    && Objects.equals(variantDatabase.getColor().getName(), variantInput.getColor().getName())) {
                variantInput.setId(variantDatabase.getId());
            }
        }));
        variantsDatabase.removeAll(variantInputs);
        List<Variant> variantsToRemove = new ArrayList<>(variantsDatabase);
        variantsToRemove.forEach(variant -> variant.setActive(false));
        return variantsToRemove;
    }


    @Override
    public void setActiveFalse(String sellerId, String id) {
        authenticatedSeller(sellerId);
        Product product = productRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new);
        if (!Objects.equals(product.getSeller().getId().toString(), sellerId)) throw new IllegalArgumentException();
        product.setActive(false);
        productRepository.save(product);
    }


    @Override
    public List<ManagementProductResponseDTO> findBySellerId(String id) {
        Seller seller = authenticatedSeller(id);
        List<Product> products = (List<Product>) seller.getProducts();
        return productConverter.convertListEntityToListDTO(products);
    }


    @Override
    public PageResponseDTO<HomeProductResponseDTO> findAllProduct(Pageable pageable) {
        Page<Product> products = productRepository.findByIsShownTrue(pageable);
        return getHomeProductResponseDTOPageResponseDTO(pageable, products);
    }


    private Product checkVoucherActiveAndSetDiscountPrice(Product product) {
        Voucher voucher = product.getVoucher();
        if (voucher != null) {
            LocalDateTime currentTime = LocalDateTime.now();
            checkCurrentTimeAndSetDiscountPrice(voucher, currentTime);
            applyDiscountBasedOnVoucher(product, voucher);
        }
        return product;
    }

    public void checkCurrentTimeAndSetDiscountPrice(Voucher voucher, LocalDateTime currentTime) {
        if (currentTime.isAfter(voucher.getTimeStart()) && currentTime.isBefore(voucher.getTimeEnd())) {
            voucher.setStatus(Voucher.Status.ACTIVE);
        } else if (currentTime.isBefore(voucher.getTimeStart())) {
            voucher.setStatus(Voucher.Status.PENDING);
        } else if (currentTime.isAfter(voucher.getTimeEnd())) {
            voucher.setStatus(Voucher.Status.EXPIRED);
        }
    }

    private void applyDiscountBasedOnVoucher(Product product, Voucher voucher) {
        if (voucher != null) {
            if (voucher.getType().equals("MONEY")) {
                product.getVariants().forEach(variant -> variant.setDiscountPrice(variant.getSalePrice() - voucher.getValue()));
            } else {
                product.getVariants().forEach(variant -> variant.setDiscountPrice(variant.getSalePrice() * (100 - voucher.getValue()) / 100));
            }
        } else {
            product.getVariants().forEach(variant -> variant.setDiscountPrice(null));
        }
    }


    @Override
    public PageResponseDTO<HomeProductResponseDTO> findByCategoryId(Pageable pageable, String categoryId,Double minPrice, Double maxPrice) {
        Page<Product> products = productRepository.findProductsByCategoryIdAndPriceRange(UUID.fromString(categoryId), minPrice,maxPrice,pageable);
        return getHomeProductResponseDTOPageResponseDTO(pageable, products);
    }


    private PageResponseDTO<HomeProductResponseDTO> getHomeProductResponseDTOPageResponseDTO(Pageable pageable, Page<Product> products) {
        List<Product> processedProducts = new ArrayList<>();
        for (Product product : products) {
            Product processedProduct = checkVoucherActiveAndSetDiscountPrice(product);
            processedProducts.add(processedProduct);
        }
        Page<HomeProductResponseDTO> productResponseDTOS = productConverter.convertPageEntityToPageDTO(new PageImpl<>(processedProducts, pageable, products.getTotalElements()));
        return productConverter.convertPageToPageResponse(productResponseDTOS);
    }


    @Override
    public SearchResponseDTO findBySearchParams(Pageable pageable, String search, Double minPrice, Double maxPrice) {
        Page<Product> products = productRepository.findByIsShownTrueAndNameContainsOrDescriptionContainsOrSubCategoryNameContains(search, search, search, pageable, minPrice, maxPrice);
        Page<HomeProductResponseDTO> page = productConverter.convertPageEntityToPageDTO(products);
        List<SubCategoryResponseDTO> responseDTOList = findBySubCategoriesName(search);
        PageResponseDTO<HomeProductResponseDTO> homeProduct = productConverter.convertPageToPageResponse(page);
        return productConverter.convertSearchListToSearchResponse(responseDTOList,homeProduct);
    }


    @Override
    public SearchResponseDTO findBySearchParamsAndProvinceList(Pageable pageable, String search, List<String> province, Double minPrice, Double maxPrice) {
        Page<Product> products = productRepository.findByIsShownTrueAndNameContainsOrDescriptionContainsOrSubCategoryNameContainsAndProvince(search, search, search, pageable, minPrice, maxPrice, province);
        Page<HomeProductResponseDTO> page = productConverter.convertPageEntityToPageDTO(products);
        List<SubCategoryResponseDTO> responseDTOList = findBySubCategoriesName(search);
        PageResponseDTO<HomeProductResponseDTO> homeProduct = productConverter.convertPageToPageResponse(page);
        return productConverter.convertSearchListToSearchResponse(responseDTOList,homeProduct);
    }

    @Override
    public List<HomeProductResponseDTO> find20SuggestProducts() {
//        if (Boolean.TRUE.equals(redisTemplate.hasKey(cacheKeyOf20SuggestProducts))) {
//            String resultString = cachedData.get(cacheKeyOf20SuggestProducts);
//            ListHomeProductResponseDTO responseDTOS = gsonUtils.parseToObject(resultString, ListHomeProductResponseDTO.class);
//            return responseDTOS.getListData();
//        }
        try {
            if (redisUtils.hasKey(cacheKeyOf20SuggestProducts)) {
                String resultString = redisUtils.getCache(cacheKeyOf20SuggestProducts);
                ListHomeProductResponseDTO responseDTOS = gsonUtils.parseToObject(resultString, ListHomeProductResponseDTO.class);
                return responseDTOS.getListData();
            }
            List<Product> products = productRepository.findByIsShownTrue();
            List<HomeProductResponseDTO> homeProductResponseDTOS = productConverter.convertEntityToProductList(products);
            ListHomeProductResponseDTO responseDTO = new ListHomeProductResponseDTO(homeProductResponseDTOS);
            String resultString = gsonUtils.parseToString(responseDTO);
//        cachedData.set(cacheKeyOf20SuggestProducts, resultString);
            redisUtils.setCache(cacheKeyOf20SuggestProducts, resultString);
            return homeProductResponseDTOS;
        } catch (Exception e) {
            List<Product> products = productRepository.findByIsShownTrue();
            return productConverter.convertEntityToProductList(products);
        }

    }


    private List<SubCategoryResponseDTO> findBySubCategoriesName(String name) {
        List<SubCategory> subCategories = subCategoryRepository.findByNameContains(name);
        return subCategoryConverter.convertListEntityToListDTO(subCategories);
    }


    @Override
    public ProductToEditResponseDTO findByIdToEdit(String sellerId, String id) {
        authenticatedSeller(sellerId);
        Product product =  productRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new);
        if (!Objects.equals(product.getSeller().getId().toString(), sellerId)) throw new IllegalArgumentException();
        return productConverter.convertEntityToEditResponse(product);
    }

    private Seller authenticatedSeller(String sellerId) {
        Seller seller = sellerService.getCurrentSeller();
        if (!seller.getId().equals(UUID.fromString(sellerId))) throw new IllegalArgumentException();
        return seller;
    }


    @Override
    public ProductDetailResponseDTO findProductDetailById(String id) {
        Product product = productRepository.findByIdAndActiveTrueAndIsShownTrue(UUID.fromString(id))
                .orElseThrow(IllegalAccessError::new);
        Product checkVoucherValidProduct = checkVoucherActiveAndSetDiscountPrice(product);
        List<Variant> shownVariants = checkVoucherValidProduct.getVariants().stream()
                .filter(Variant::isShown)
                .collect(Collectors.toList());
        checkVoucherValidProduct.setVariants(shownVariants);
        checkVoucherValidProduct.setView(checkVoucherValidProduct.getView() + 1);
        List<Voucher> vouchers = voucherRepository.findByProductId(checkVoucherValidProduct.getId());
        vouchers.sort(Comparator.comparing(Voucher::getTimeEnd).reversed());
        List<VoucherProductDetailDTO> voucherResponseDTOS = voucherConverter.convertListEntityToListVoucherProductDetail(vouchers);
        return productConverter.converterEntityToResponse(product,voucherResponseDTOS);
    }


    @Override
    public List<RelatedProductResponseDTO> findTop10ViewsRelatedProductsBySubCategoryId(String productId) {
        Product product = productRepository.findByIdAndActiveTrueAndIsShownTrue(UUID.fromString(productId))
                .orElseThrow(IllegalAccessError::new);
        Pageable pageable = PageRequest.of(0, 10);
        Page<Product> topRelatedProductsPage = productRepository.findTop10ViewsRelatedProductsBySubCategoryId(product.getSubCategory().getId(), UUID.fromString(productId), pageable);
        List<Product> top10RelatedProducts = topRelatedProductsPage.getContent();
        return productConverter.convertListEntityToListRelatedProductDTO(top10RelatedProducts);

    }


    public List<ProductToCreateVoucherDTO> findProductsBySellerId(String id) {
        Seller seller = authenticatedSeller(id);
        List<Product> products = productRepository.findBySeller(seller);
        return productConverter.convertListEntityToListCreateVoucherResponse(products);
    }


    public CategoryProductPageResponseDTO findProductsByCategoryId(Pageable pageable, String id,Double minPrice, Double maxPrice) {
        PageResponseDTO<HomeProductResponseDTO> products = findByCategoryId(pageable,id,minPrice,maxPrice);
        List<SubCategoryResponseDTO> subCategoryList = subCategoryService.findByIdCategory(id);
        return productConverter.convertEntityToCategoryPageResponse(products,subCategoryList);
    }


    @Override
    public CategoryProductPageResponseDTO findProductsBySubCategoryId(Pageable pageable, String id, Double minPrice, Double maxPrice, String categoryId) {
        PageResponseDTO<HomeProductResponseDTO> products = findBySubCategoryId(pageable,id,minPrice,maxPrice);
        List<SubCategoryResponseDTO> subCategoryList = subCategoryService.findByIdCategory(categoryId);
        return productConverter.convertEntityToCategoryPageResponse(products,subCategoryList);
    }


    private PageResponseDTO<HomeProductResponseDTO> findBySubCategoryId(Pageable pageable, String subCategoryId,Double minPrice, Double maxPrice) {
        Page<Product> products = productRepository.findProductsBySubCategoryIdAndPriceRange(UUID.fromString(subCategoryId), minPrice,maxPrice,pageable);
        return getHomeProductResponseDTOPageResponseDTO(pageable, products);
    }


    @Override
    public CategoryProductPageResponseDTO findProductsBySubCategoryIdList(Pageable pageable, List<String> subCategory, String id,Double minPrice, Double maxPrice) {
        List<UUID> subCategoryUUIDs = subCategory.stream()
                .map(UUID::fromString)
                .collect(Collectors.toList());
        PageResponseDTO<HomeProductResponseDTO> products = findPageProductsBySubCategoryId(subCategoryUUIDs,pageable,minPrice,maxPrice);
        List<SubCategoryResponseDTO> subCategoryList = subCategoryService.findByIdCategory(id);
        return productConverter.convertEntityToCategoryPageResponse(products,subCategoryList);
    }


    @Override
    public CategoryProductPageResponseDTO findProductsByProvinceList(Pageable pageable, List<String> province, String id, Double minPrice, Double maxPrice) {
        PageResponseDTO<HomeProductResponseDTO> products = findPageProductsByProvince(province,id,pageable,minPrice,maxPrice);
        List<SubCategoryResponseDTO> subCategoryList = subCategoryService.findByIdCategory(id);
        return productConverter.convertEntityToCategoryPageResponse(products,subCategoryList);
    }


    private PageResponseDTO<HomeProductResponseDTO> findPageProductsByProvince(List<String> province, String id, Pageable pageable, Double minPrice, Double maxPrice) {
        Page<Product> products = productRepository.findProductsByProvinceName(province,UUID.fromString(id),minPrice,maxPrice,pageable);
        return getHomeProductResponseDTOPageResponseDTO(pageable, products);
    }


    @Override
    public CategoryProductPageResponseDTO findProductsBySubCategoryIdListAndProvinceList(Pageable pageable, List<String> subCategory, List<String> province, String id, Double minPrice, Double maxPrice) {
        PageResponseDTO<HomeProductResponseDTO> products = findPageProductsBySubCategoryAndProvince(subCategory,province,id,pageable,minPrice,maxPrice);
        List<SubCategoryResponseDTO> subCategoryList = subCategoryService.findByIdCategory(id);
        return productConverter.convertEntityToCategoryPageResponse(products,subCategoryList);
    }



    private PageResponseDTO<HomeProductResponseDTO> findPageProductsBySubCategoryAndProvince(List<String> subCategory, List<String> province,String id, Pageable pageable, Double minPrice, Double maxPrice) {
        List<UUID> subCategoryUUIDs = subCategory.stream()
                .map(UUID::fromString)
                .toList();
        Page<Product> products = productRepository.findProductsByProvinceNameAndSubCategoryId(subCategoryUUIDs,province,UUID.fromString(id),minPrice,maxPrice,pageable);
        return getHomeProductResponseDTOPageResponseDTO(pageable, products);
    }


    private PageResponseDTO<HomeProductResponseDTO> findPageProductsBySubCategoryId(List<UUID> subCategory, Pageable pageable,Double minPrice, Double maxPrice) {
        Page<Product> productPage = productRepository.findProductsBySubCategoryId(subCategory,minPrice,maxPrice,pageable);
        return getHomeProductResponseDTOPageResponseDTO(pageable, productPage);
    }
}
