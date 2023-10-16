package com.cogy_ecommerce_service.service.impl;


import com.cogy_ecommerce_service.converter.RoleConverter;
import com.cogy_ecommerce_service.converter.SellerConverter;
import com.cogy_ecommerce_service.converter.UserConverter;
import com.cogy_ecommerce_service.converter.UserLocationConverter;
import com.cogy_ecommerce_service.entity.Cart;
import com.cogy_ecommerce_service.entity.Role;
import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.entity.UserLocation;
import com.cogy_ecommerce_service.exception.DuplicateFieldUserException;
import com.cogy_ecommerce_service.payload.request.ChangePasswordRequestDTO;
import com.cogy_ecommerce_service.payload.request.ProfileRequestDTO;
import com.cogy_ecommerce_service.payload.request.RegisterRequestDTO;
import com.cogy_ecommerce_service.payload.request.UserLocationRequestDTO;
import com.cogy_ecommerce_service.payload.response.CartResponseDTO;
import com.cogy_ecommerce_service.payload.response.ChangePasswordResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListUserLocationResponseDTO;
import com.cogy_ecommerce_service.payload.response.LoginResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProfileResponseDTO;
import com.cogy_ecommerce_service.payload.response.MessageResponseDTO;
import com.cogy_ecommerce_service.payload.response.SellerResponseDTO;
import com.cogy_ecommerce_service.payload.response.UserLocationResponseDTO;
import com.cogy_ecommerce_service.repository.CartRepository;
import com.cogy_ecommerce_service.repository.RoleRepository;
import com.cogy_ecommerce_service.repository.UserLocationRepository;
import com.cogy_ecommerce_service.repository.UserRepository;
import com.cogy_ecommerce_service.service.UserService;
import com.cogy_ecommerce_service.utils.Constant;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final MailSender mailSender;
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final CartRepository cartRepository;

    private final ModelMapper modelMapper;

    private final RoleConverter roleConverter;

    private final UserLocationConverter userLocationConverter;

    private final SellerConverter sellerConverter;

    private final UserLocationRepository userLocationRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserConverter userConverter;

    @Override
    public User findById(String id) {
        return userRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new);
    }

    @Override
    public MessageResponseDTO save(RegisterRequestDTO registerRequestDTO) throws DuplicateFieldUserException {
        checkValueOfUniqueField(registerRequestDTO);
        User user = modelMapper.map(registerRequestDTO, User.class);
        if (!registerRequestDTO.getPassword().isEmpty()) {
            String hashedPassword = BCrypt.hashpw(registerRequestDTO.getPassword(), BCrypt.gensalt(10));
            user.setPassword(hashedPassword);
        }
        user.setId(UUID.randomUUID());
        user.setActive(true);
        user.setWallet(0.0);
        user.setStatus(User.Status.PENDING_CONFIRMATION);
        Role roleCustomer = roleRepository.findByName("ROLE_CUSTOMER");
        Set<Role> roles = new HashSet<>(List.of(new Role[]{roleCustomer}));
        user.setRoles(roles);
        user.setCart(Cart.builder().id(UUID.randomUUID()).user(user).build());
        User newUser = userRepository.save(user);
        String confirmationCode = generateConfirmationCode();
        newUser.setConfirmationCode(confirmationCode);
        sendConfirmationEmail(newUser.getEmail(), confirmationCode);
        return new MessageResponseDTO(Constant.REGISTER_SUCCESS);
    }

    private String generateConfirmationCode() {
        return UUID.randomUUID().toString();
    }

    public void sendConfirmationEmail(String recipientEmail, String confirmationCode) {
        String confirmationLink = Constant.CONFIRM_EMAIL_LINK + confirmationCode;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Xác nhận đăng ký");
        message.setText("Xin chào,\n\nVui lòng nhấp vào liên kết sau để xác nhận đăng ký tài khoản của bạn:\n"  + confirmationLink);
        mailSender.send(message);
    }

    private void checkValueOfUniqueField(RegisterRequestDTO registerRequestDTO) throws DuplicateFieldUserException {
       if (userRepository.existsByUsername(registerRequestDTO.getUsername())) {
            throw new DuplicateFieldUserException(String.format(
                    "Username %s already exists!", registerRequestDTO.getUsername()));
        }
        if (userRepository.existsByEmail(registerRequestDTO.getEmail())) {
            throw new DuplicateFieldUserException(String.format(
                    "Email %s already exists!", registerRequestDTO.getEmail()));
        }
        final String phone = registerRequestDTO.getPhone()
                .substring(registerRequestDTO.getPhone().length() - 9);
        if (userRepository.existsByPhoneContaining(phone)) {
            throw new DuplicateFieldUserException(String.format(
                    "Phone number %s already exists!", registerRequestDTO.getPhone()));
        }
    }


    @Override
    public boolean existsValueByField(String field, String value) {
        switch (field) {
            case "username" -> {
                return userRepository.existsByUsername(value);
            }
            case "email" -> {
                return userRepository.existsByEmail(value);
            }
            case "phone" -> {
                return userRepository.existsByPhoneContaining(value);
            }
            default -> {
                return false;
            }
        }
    }


    @Override
    public MessageResponseDTO getLoginFailResponse() {
        return new MessageResponseDTO(Constant.LOGIN_FAIL);
    }

    @Override
    public LoginResponseDTO getLoginSuccessResponse(String username, String token) {
        User user = userRepository.findByUsername(username);
        SellerResponseDTO seller = user.getSeller() == null
                ? null
                : sellerConverter.convertEntityToResponse(user.getSeller());
        return LoginResponseDTO
                .builder()
                .fullName(user.getFullName())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .roles(roleConverter.convertSetEntitiesToSetResponses(user.getRoles()))
                .seller(seller)
                .cartId(user.getCart().getId())
                .userId(user.getId())
                .token(token)
                .build();
    }


    @Override
    public ProfileResponseDTO update(String id, ProfileRequestDTO profileRequestDTO) {
        User user = getCurrentUser();
        if (!user.getId().equals(UUID.fromString(id))) throw new IllegalArgumentException();
        userLocationRepository.deleteAll(user.getLocations());
        user.setAvatar(profileRequestDTO.getAvatar());
        user.setEmail(profileRequestDTO.getEmail());
        user.setFullName(profileRequestDTO.getFullName());
        user.setPhone(profileRequestDTO.getPhone());
        user.setGender(profileRequestDTO.getGender());
        List<UserLocation> locations = userLocationConverter.convertListRequestToListEntity(profileRequestDTO.getLocations());
        checkLocations(locations);
        for (UserLocation userLocation : locations) {
                userLocation.setUser(user);
            }
        user.setLocations(locations);
        User updatedUser = userRepository.save(user);
        return userConverter.convertEntityToProfileResponse(updatedUser);
    }


    @Override
    public ProfileResponseDTO findByUserId(String id) {
        User user = getCurrentUser();
        if (!user.getId().equals(UUID.fromString(id))) throw new IllegalArgumentException();
        return userConverter.convertEntityToProfileResponse(user);
    }


    @Override
    public ProfileResponseDTO getUserData(CartResponseDTO cartResponseDTO) {
        Cart cart = cartRepository.findById(UUID.fromString(cartResponseDTO.getId()))
                .orElseThrow(IllegalArgumentException::new);
        return userConverter.convertEntityToProfileResponse(cart.getUser());
    }


    @Override
    public boolean isCurrentPasswordValid(String username, String currentPassword) {
        User user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(currentPassword, user.getPassword());
    }


    @Override
    public ChangePasswordResponseDTO changePassword(ChangePasswordRequestDTO changePasswordRequestDTO) {
        String username = changePasswordRequestDTO.getUsername();
        User user = getCurrentUser();
        if (!user.getUsername().equals(username)) throw new IllegalArgumentException();
        ChangePasswordResponseDTO responseDTO = new ChangePasswordResponseDTO();
        if(!isCurrentPasswordValid(username, changePasswordRequestDTO.getCurrentPassword())){
            responseDTO.setSuccess(false);
            responseDTO.setMessage("Invalid input password");
            return responseDTO;
        }
        String newPassword = changePasswordRequestDTO.getNewPassword();
        String confirmNewPassword = changePasswordRequestDTO.getConfirmPassword();

        if(!newPassword.equals(confirmNewPassword)){
            responseDTO.setSuccess(false);
            responseDTO.setMessage("Hai mat khau khong khop voi nhau");
            return responseDTO;
        }

        user.setPassword(passwordEncoder.encode(changePasswordRequestDTO.getNewPassword()));
        userRepository.save(user);
        responseDTO.setSuccess(true);
        responseDTO.setMessage("thay doi mat khau thanh cong");
        return responseDTO;
    }

    @Override
    public ListUserLocationResponseDTO findLocationByUserId(String id) {
        User user = getCurrentUser();
        if (!user.getId().equals(UUID.fromString(id))) throw new IllegalArgumentException();
        List<UserLocationResponseDTO> locations = userLocationConverter.convertListEntityToListResponse(user.getLocations());
        return new ListUserLocationResponseDTO(locations);
    }

    @Override
    public UserLocationResponseDTO saveUserLocation(String id, UserLocationRequestDTO requestDTO) {
        User user = getCurrentUser();
        if (!user.getId().equals(UUID.fromString(id))) throw new IllegalArgumentException();
        UserLocation userLocation = userLocationConverter.convertRequestToEntity(requestDTO);
        userLocation.setUser(user);
        UserLocation responseEntity = userLocationRepository.save(userLocation);
        return userLocationConverter.convertEntityToResponse(responseEntity);
    }


    private void checkLocations(List<UserLocation> locations) {
        if (locations.isEmpty()) return;
        int numberDefaultAddress = 0;
        List<UserLocation> locationList = new ArrayList<>(locations);
        for (UserLocation location : locationList) {
            if (location.isDefaultAddress()) {
                ++numberDefaultAddress;
            }
        }
        if (numberDefaultAddress != 1) throw new IllegalArgumentException();
    }


    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails details = (UserDetails) authentication.getPrincipal();
        String username = details.getUsername();
        return userRepository.findByUsername(username);
    }

}