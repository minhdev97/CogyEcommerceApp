package com.cogy_ecommerce_service.utils;

import com.cogy_ecommerce_service.configuration.EnvVariable;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class GHTKServiceUtils {

    private static final String token = EnvVariable.GHTK_TOKEN;

    private final RestTemplate restTemplate;

    private final String BASE_URL = "https://services.giaohangtietkiem.vn";


    public Object callApiToGHTKDeliveryService(String url, HttpMethod httpMethod, Object body, Class<?> responseClass){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Token", token);
        HttpEntity<Object> requestEntity;
        if (body == null) {
            requestEntity = new HttpEntity<>(headers);
        } else {
            requestEntity = new HttpEntity<>(body, headers);
        }
        final String URL = BASE_URL + url;
        System.err.println(URL);
        ResponseEntity<?> response = restTemplate.exchange(
                URL,
                httpMethod,
                requestEntity,
                responseClass
        );
        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            return null;
        }
    }


}
