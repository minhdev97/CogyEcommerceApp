package com.cogy_ecommerce_service.configuration;

public class EnvVariable {
    public static final String JWT_SECRET = "9a02115a835ee03d5fb83cd8a468ea33e4090aaaec87f53c9fa54512bbef4db8dc656c82a315fa0c785c08b0134716b81ddcd0153d2a7556f2e154912cf5675f";

    public static final long JWT_EXPIRATION_IN_MS = 604800000;

    public static final String CORS_ALLOWED_ORIGINS = "http://localhost:3000";

    public static final String CACHE_KEY_CATEGORIES = "listCategoryResponseDTO";

    public static final String CACHE_KEY_20_SUGGEST_PRODUCTS = "20SuggestProducts";

    public static final String GHTK_TOKEN = "58e59EdE3A57b2063e418C68Be43DAA8A7b2B867";

    public static final String REDIS_URL = "redis://:pfc9cf30dc47557f830e712a0ebb6042e9acdfea2e747b8cf1843ba8380cf70dc@ec2-54-237-169-13.compute-1.amazonaws.com:32729";

    public static final String RABBITMQ_HOST = "fish.rmq.cloudamqp.com";
    public static final int RABBITMQ_PORT = 5672;
    public static final String RABBITMQ_USERNAME = "kcecbzng";
    public static final String RABBITMQ_PASSWORD = "fyRmiSBN5jhBV1C05Ooq78dtTvSWOGuT";
    public static final String RABBITMQ_EXCHANGE = "cogy-ecommerce";
    public static final String RABBITMQ_QUEUE_SHIPMENT_KEY = "shipmentRoutingKey";

    public static final String MAIL_SERVER_HOST = "smtp.gmail.com";
    public static final int MAIL_SERVER_PORT = 587;
    public static final String MAIL_SERVER_EMAIL = "cogy.ecommerce@gmail.com";
    public static final String MAIL_SERVER_PASSWORD = "vtgawnhpkwhstwyy";
    public static final String MAIL_SERVER_IS_SSL = "false";

}
