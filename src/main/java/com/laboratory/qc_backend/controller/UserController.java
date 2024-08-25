package com.laboratory.qc_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.laboratory.qc_backend.entity.UserEntity;
import com.laboratory.qc_backend.dto.UserDto;
import com.laboratory.qc_backend.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {
  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public ResponseEntity<UserEntity> registerUser(@RequestBody UserDto userDto) {
    UserEntity user = userService.registerUser(userDto);
    return ResponseEntity.ok(user);
  }

  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserDto userDto) {
    try {
      UserEntity user = userService.loginUser(userDto);
      userService.updateLastLogin(user.getId());
      Map<String, String> response = new HashMap<>();
      response.put("token", user.getToken());
      response.put("id", user.getId());
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
  }

  @GetMapping("/user")
  public ResponseEntity<UserDto> getUser(@RequestParam String id) {
    UserDto user = userService.getUser(id);
    if (user != null) {
      return ResponseEntity.ok(user);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }


  @GetMapping("/token")
  public ResponseEntity<UserEntity> generateToken(@RequestParam String id) {
    UserEntity user = userService.generateToken(id);
    return ResponseEntity.ok(user);
  }
}
