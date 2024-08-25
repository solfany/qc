//package com.laboratory.qc_backend.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class ProxyConfig implements WebMvcConfigurer {
//  @Bean
//  public CorsFilter corsFilter() {
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    CorsConfiguration config = new CorsConfiguration();
//    config.setAllowCredentials(true);
//    config.addAllowedOriginPattern("http://localhost:3000"); // 프론트엔드 애플리케이션의 도메인 및 포트번호
//    config.addAllowedOriginPattern("http://localhost:3000/register"); // 프론트엔드 애플리케이션의 도메인 및 포트번호
//    config.addAllowedHeader("*");
//    config.addAllowedMethod("*");
//    source.registerCorsConfiguration("/api/**", config);
//    return new CorsFilter(source);
//  }
//}
