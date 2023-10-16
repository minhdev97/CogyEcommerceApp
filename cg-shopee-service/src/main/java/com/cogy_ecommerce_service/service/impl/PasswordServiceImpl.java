package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.exception.InvalidConfirmationCodeException;
import com.cogy_ecommerce_service.payload.request.ForgetPasswordRequestDTO;
import com.cogy_ecommerce_service.repository.UserRepository;
import com.cogy_ecommerce_service.service.PasswordService;
import com.cogy_ecommerce_service.utils.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.DuplicateFormatFlagsException;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PasswordServiceImpl implements PasswordService {
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    @Override
    public void isValidateEmail(ForgetPasswordRequestDTO forgetPasswordRequestDTO) throws DuplicateFormatFlagsException {
        if(userRepository.existsByEmail(forgetPasswordRequestDTO.getEmail())){
            String confirmationCode = generateConfirmCodeEmail();
            User user = userRepository.findUserByEmail(forgetPasswordRequestDTO.getEmail());
            user.setConfirmationCode(confirmationCode);
            userRepository.save(user);
            sendConfirmEmail(forgetPasswordRequestDTO.getEmail(), confirmationCode);
        } else {
            throw new DuplicateFormatFlagsException("Email not found in the database");
        }
    }

    @Override
    public void resetPassword(ForgetPasswordRequestDTO requestDTO) throws InvalidConfirmationCodeException {
        User user = userRepository.findUserByEmailAndConfirmationCode(requestDTO.getEmail(), requestDTO.getConfirmationCode());
        if(user == null){
            throw new InvalidConfirmationCodeException("Invalid confirmation code for the provided email.");
        }
        String hashPassword = hashPassword(requestDTO.getNewPassword());
        user.setPassword(hashPassword);
        user.setConfirmationCode(null);
        userRepository.save(user);
        sendPasswordResetConfirmationEmail(requestDTO.getEmail());
    }

    private String generateConfirmCodeEmail(){
        return UUID.randomUUID().toString();
    }

    private void sendConfirmEmail(String recipientEmail, String confirmationCode){
       String confirmationLink = Constant.NEW_PASSWORD_FORM + confirmationCode;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("xac nhan email");
        message.setText("Xin chào,\n\nVui lòng nhấp vào liên kết sau để xác nhận việc tạo mật khẩu mới của bạn:\n" + confirmationLink);
        mailSender.send(message);
    }

    private String hashPassword(String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    private void sendPasswordResetConfirmationEmail(String recipientEmail){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(recipientEmail);
        mailMessage.setSubject("Password Reset Successfully");
        mailMessage.setText("Your password has been successfully reset.  Please keep it secure and do not share it with anyone.");
        mailSender.send(mailMessage);
    }
}
