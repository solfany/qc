package com.laboratory.qc_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.laboratory.qc_backend.entity.UserEntity;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

  @Value("${jwt.secret}")
  private String secretKey;

  @Value("${jwt.expiration}")
  private long expirationTime;

  // JWT에서 이름 추출
  public String extractName(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  // JWT에서 만료 날짜 추출
  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  // JWT에서 클레임 추출
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  // 모든 클레임 추출
  private Claims extractAllClaims(String token) {
    return Jwts.parser()
      .setSigningKey(secretKey)
      .parseClaimsJws(token)
      .getBody();
  }

  // 토큰 만료 여부 확인
  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  // 클레임 및 주제에 따라 토큰 생성
  private String createToken(Map<String, Object> claims, String subject) {
    return Jwts.builder()
      .setClaims(claims)
      .setSubject(subject)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
      .signWith(SignatureAlgorithm.HS256, secretKey)
      .compact();
  }

  // UserEntity를 기반으로 토큰 생성
  public String createToken(UserEntity user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("name", user.getName());
    return createToken(claims, user.getName());
  }

  // 토큰 유효성 검사
  public Boolean validateToken(String token, String name) {
    final String extractedName = extractName(token);
    return (extractedName.equals(name) && !isTokenExpired(token));
  }
}
