package com.cogy_ecommerce_service.service;


import com.cogy_ecommerce_service.payload.response.DataMailDTO;

import javax.mail.MessagingException;

public interface MailService {
    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
