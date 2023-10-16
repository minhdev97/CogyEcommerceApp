package com.cogy_ecommerce_service.controller.authenticated;

import com.cogy_ecommerce_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(value = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ExistenceController {


    @Autowired
    private UserService userService;


    @GetMapping("/check-existence/{field}/{value}")
        public ResponseEntity<?> checkExistence(@PathVariable String field ,@PathVariable String value) {
            boolean exist = userService.existsValueByField(field,value);
            return ResponseEntity.ok().body(exist);
    }


}
