package com.cogy_ecommerce_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serial;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@Valid
public class RegisterRequestDTO {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 50, message = "Full name must be between 2 and 50 characters")
    private String fullName;

    @NotBlank(message = "Username is required")
    @Size(min = 8, max = 20, message = "Username must be between 8 and 20 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Size(max = 50, message = "Email must not exceed 50 characters")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Phone number is required")
    private String phone;


    @Override
    public String toString() {
        return String.format("fullName = %s, username = %s, email = %s, phone = %s, password = %s",
                getFullName(), getUsername(), getEmail(), getPhone(), getPassword());
    }
}
