package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.cache.TokenCache;
import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.exception.DuplicateFieldUserException;
import com.cogy_ecommerce_service.payload.request.ChangePasswordRequestDTO;
import com.cogy_ecommerce_service.payload.request.LoginRequestDTO;
import com.cogy_ecommerce_service.payload.request.RegisterRequestDTO;
import com.cogy_ecommerce_service.payload.response.ChangePasswordResponseDTO;
import com.cogy_ecommerce_service.payload.response.MessageResponseDTO;
import com.cogy_ecommerce_service.repository.UserRepository;
import com.cogy_ecommerce_service.security.JwtTokenProvider;
import com.cogy_ecommerce_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api")
public class AuthController {
    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider tokenProvider;

    private final UserService userService;

    private final UserRepository userRepository;
    private final TokenCache tokenCache = TokenCache.getInstance();


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            // Gọi hàm authenticate để xác thực thông tin đăng nhập
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getUsername(), loginRequestDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // Gọi hàm tạo Token
            String token = tokenProvider.generateToken(authentication);
            tokenCache.addToken(loginRequestDTO.getUsername(), token);
            return new ResponseEntity<>(
                    userService.getLoginSuccessResponse(loginRequestDTO.getUsername(), token),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    userService.getLoginFailResponse(),
                    HttpStatus.BAD_REQUEST
            );

        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequestDTO registerRequestDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("Invalid input", HttpStatus.BAD_REQUEST);
        }
        try {
            MessageResponseDTO message = userService.save(registerRequestDTO);
            return new ResponseEntity<>(message, HttpStatus.CREATED);
        } catch (DuplicateFieldUserException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to register user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/email-subscription-success")
    public MessageResponseDTO confirmRegistration(@RequestParam("code") String confirmationCode) {
        User user = userRepository.findByConfirmationCode(confirmationCode);
        if (user == null) {
            return new MessageResponseDTO("Mã xác nhận không hợp lệ hoặc đã hết hạn.");
        }
        if (user.getStatus() == User.Status.ACTIVE) {
            return new MessageResponseDTO("Tài khoản đã được xác nhận trước đó.");
        }
        if(user.getStatus() == User.Status.PENDING_CONFIRMATION){
            return new MessageResponseDTO("Không thể xác nhân được tài khoản , tài khoản không hợp lệ");
        }
        user.setStatus(User.Status.ACTIVE);
        userRepository.save(user);
        return new MessageResponseDTO("Xác nhận email thành công. ");
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequestDTO changePasswordRequestDTO) {
        ChangePasswordResponseDTO responseDTO = userService.changePassword(changePasswordRequestDTO);
        if (responseDTO.isSuccess()) {
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }
    }


}



