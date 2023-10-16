package com.cogy_ecommerce_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class COGYEcommerceServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(COGYEcommerceServiceApplication.class, args);
	}
}
