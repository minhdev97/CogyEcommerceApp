package com.cogy_ecommerce_service.configuration;

import com.cogy_ecommerce_service.utils.LocalDateTimeTypeAdapter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.data.redis.LettuceClientConfigurationBuilderCustomizer;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.net.URI;
import java.time.LocalDateTime;

@Configuration
@EnableCaching
@AutoConfigureAfter(RedisAutoConfiguration.class)
public class RedisConfiguration extends CachingConfigurerSupport {

    @Bean
    public LettuceClientConfigurationBuilderCustomizer lettuceClientConfigurationBuilderCustomizer() {
        return clientConfigurationBuilder -> {
            if (clientConfigurationBuilder.build().isUseSsl()) {
                clientConfigurationBuilder.useSsl().disablePeerVerification();
            }
        };
    }


    @Bean
    public Gson gson(LocalDateTimeTypeAdapter localDateTimeTypeAdapter) {
        return new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, localDateTimeTypeAdapter)
                .create();
    }


    @Bean
    public LocalDateTimeTypeAdapter localDateTimeTypeAdapter() {
        return new LocalDateTimeTypeAdapter();
    }


//    @Bean
//    public LettuceConnectionFactory redisConnectionFactory() {
////        URI redisUri = URI.create(redisURL);
//        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
//        config.setHostName(redisHost);
//        config.setPort(redisPort);
//        config.setPassword(redisPassword);
//        return new LettuceConnectionFactory(config);
//    }
//
//
//    @Bean
//    public RedisCacheConfiguration redisCacheConfiguration() {
//        return RedisCacheConfiguration.defaultCacheConfig()
//                .disableKeyPrefix()
//                .serializeKeysWith(RedisSerializationContext.SerializationPair
//                        .fromSerializer(new StringRedisSerializer()))
//                .serializeValuesWith(RedisSerializationContext.SerializationPair
//                        .fromSerializer(new GenericJackson2JsonRedisSerializer()));
//    }
//
//
//    @Bean
//    public RedisCacheManager redisCacheManager(
//            RedisConnectionFactory redisConnectionFactory, RedisCacheConfiguration redisCacheConfiguration) {
//        return RedisCacheManager.builder(redisConnectionFactory)
//                .cacheDefaults(redisCacheConfiguration)
//                .build();
//    }
//
//
//    @Bean
//    public RedisTemplate<String, String> redisTemplate(
//            RedisConnectionFactory redisConnectionFactory) {
//        RedisTemplate<String, String> template = new RedisTemplate<>();
//        template.setConnectionFactory(redisConnectionFactory);
//        template.setKeySerializer(new StringRedisSerializer());
//        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
//        return template;
//    }


//    @Bean
//    public ValueOperations<String, String> cachedData(RedisTemplate<String, String> redisTemplate) {
//        return redisTemplate.opsForValue();
//    }

}
