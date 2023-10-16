package com.cogy_ecommerce_service.service;


import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.exception.DuplicateFieldUserException;
import com.cogy_ecommerce_service.payload.request.ChangePasswordRequestDTO;
import com.cogy_ecommerce_service.payload.request.ForgetPasswordRequestDTO;
import com.cogy_ecommerce_service.payload.request.ProfileRequestDTO;
import com.cogy_ecommerce_service.payload.request.RegisterRequestDTO;
import com.cogy_ecommerce_service.payload.request.UserLocationRequestDTO;
import com.cogy_ecommerce_service.payload.response.CartResponseDTO;
import com.cogy_ecommerce_service.payload.response.ChangePasswordResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListUserLocationResponseDTO;
import com.cogy_ecommerce_service.payload.response.LoginResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProfileResponseDTO;
import com.cogy_ecommerce_service.payload.response.MessageResponseDTO;
import com.cogy_ecommerce_service.payload.response.UserLocationResponseDTO;


public interface UserService {

    User findById(String id);

    ProfileResponseDTO findByUserId(String id);

    ProfileResponseDTO update(String id, ProfileRequestDTO profileRequestDTO);

    MessageResponseDTO save(RegisterRequestDTO registerRequestDTO) throws DuplicateFieldUserException;

    boolean existsValueByField(String field, String data);

    LoginResponseDTO getLoginSuccessResponse(String username, String token);

    MessageResponseDTO getLoginFailResponse();

    ProfileResponseDTO getUserData(CartResponseDTO cartResponseDTO);

    boolean isCurrentPasswordValid(String username, String currentPassword);

    ChangePasswordResponseDTO changePassword(ChangePasswordRequestDTO changePasswordRequestDTO);


    ListUserLocationResponseDTO findLocationByUserId(String id);

    UserLocationResponseDTO saveUserLocation(String id, UserLocationRequestDTO requestDTO);

    User getCurrentUser();
}
