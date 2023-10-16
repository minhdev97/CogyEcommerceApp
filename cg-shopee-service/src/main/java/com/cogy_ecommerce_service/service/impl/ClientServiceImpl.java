package com.cogy_ecommerce_service.service.impl;


import com.cogy_ecommerce_service.payload.response.CartLineResponseDTO;
import com.cogy_ecommerce_service.payload.response.CartResponseDTO;
import com.cogy_ecommerce_service.payload.response.DataMailDTO;
import com.cogy_ecommerce_service.payload.response.ProfileResponseDTO;
import com.cogy_ecommerce_service.service.ClientService;
import com.cogy_ecommerce_service.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.cogy_ecommerce_service.utils.Constant;
import javax.mail.MessagingException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final UserServiceImpl userService;

    private final MailService mailService;
    @Override
    public Boolean create(CartResponseDTO cartResponseDTO) {
        try {
            DataMailDTO dataMail = new DataMailDTO();
            ProfileResponseDTO userData = userService.getUserData(cartResponseDTO);
            dataMail.setTo(userData.getEmail());
            dataMail.setSubject(Constant.ORDER_CONFIRMATION);

            Map<String, Object> props = new HashMap<>();
            props.put("name", userData.getFullName());
            Collection<CartLineResponseDTO> abc = cartResponseDTO.getCartLines();
            double totalPrice = 0;
            for (CartLineResponseDTO cartLine : abc) {
                double price = cartLine.getSalePrice();
                totalPrice += price;
            }

            Locale localeVN = new Locale("vi", "VN");
            NumberFormat currencyFormatter = DecimalFormat.getCurrencyInstance(localeVN);
            String formattedTotalPrice = currencyFormatter.format(totalPrice);

            props.put("totalPrice", formattedTotalPrice);
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, Constant.ORDER_NOTIFICATION);
            return true;
        } catch (MessagingException exp){
            exp.printStackTrace();
        }
        return false;
    }

}
