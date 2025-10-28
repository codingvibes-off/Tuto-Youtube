package com.example.tacking.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.IOException;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.dto.UserDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service
public class JwtService {
    private String secretkey = "uneCléTrèsLongueEtSécuriséePourSignerLeToken123456789";
    public static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    public JwtService() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            secretkey = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
      
     public String generateRefreshToken(UserDTO userDTO) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 jours

        return Jwts.builder()
                .setSubject(userDTO.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiry)
                 .signWith(getKey())
                .compact();
    }

    public String generateToken(UserDTO userDTO) {
       Map<String, Object> claims = new HashMap<>();
        claims.put("id", userDTO.getId());
        claims.put("name", userDTO.getName());
        claims.put("email", userDTO.getEmail());
        claims.put("ROLES", "USER");
        return Jwts.builder()
           .setClaims(claims)
           .setSubject(userDTO.getEmail())
           .setIssuedAt(new Date())
           .setExpiration(new Date(System.currentTimeMillis() + 3600_000))
           .signWith(getKey())
           .compact(); 
         
    }
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretkey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }  

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())  
                .build()
                .parseClaimsJws(token)     
                .getBody();               

    }
    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    public UserAuthDTO getUserFromToken(String token) throws IOException {
        Claims claims = getAllClaimsFromToken(token);
        UserAuthDTO userAuthDTO = new UserAuthDTO();
        userAuthDTO.setId(UUID.fromString((String) claims.get("id")));
        userAuthDTO.setEmail((String) claims.get("email"));
        return userAuthDTO;  
    }


    public Claims getAllClaimsFromToken(String token) {
    JwtParser parser = Jwts.parserBuilder()
            .setSigningKey(getKey())
            .build();
    return parser.parseClaimsJws(token).getBody();
    }


}
