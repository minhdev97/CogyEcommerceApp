package com.cogy_ecommerce_service.cache;

import java.util.HashMap;

public final class TokenCache {
    private static TokenCache instance;
    private HashMap<String,String> tokenMap;

    private TokenCache(){
        tokenMap = new HashMap<>();
    }

    public static synchronized TokenCache getInstance() {
        if(instance == null){
            instance = new TokenCache();
        }
        return instance;
    }

    public void addToken(String username,String token) {
        tokenMap.put(username, token);
    }

    public String getToken(String username){
        return tokenMap.get(username);
    }

    public void removeToken(String username){
        tokenMap.remove(username);
    }
}
