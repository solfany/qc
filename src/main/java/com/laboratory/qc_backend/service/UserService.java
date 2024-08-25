package com.laboratory.qc_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.laboratory.qc_backend.entity.UserEntity;
import com.laboratory.qc_backend.dto.UserDto;
import com.laboratory.qc_backend.repository.UserRepository;
import com.laboratory.qc_backend.security.JwtUtil;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtil jwtUtil;

  // 사용자 등록
  public UserEntity registerUser(UserDto userDto) {
    UserEntity user = new UserEntity();
    user.setName(userDto.getName());
    user.setId(userDto.getId());
    user.setPassword(userDto.getPassword());
    userRepository.save(user);
    String token = jwtUtil.createToken(user);
    user.setToken(token);
    return user;
  }

  // 사용자 로그인
  public UserEntity loginUser(UserDto userDto) {
    Optional<UserEntity> user = userRepository.findByIdAndPassword(userDto.getId(), userDto.getPassword());
    UserEntity userEntity = user.orElseThrow(() -> new RuntimeException("Invalid credentials"));
    String token = jwtUtil.createToken(userEntity);
    userEntity.setToken(token);
    return userEntity;
  }

  // 사용자 정보 조회
  public UserDto getUser(String id) {
    Optional<UserEntity> userEntity = userRepository.findById(id);
    if (userEntity.isPresent()) {
      UserEntity user = userEntity.get();
      return new UserDto(user.getName(), user.getId(), user.getPassword(), user.getPhone(), user.getEmail(), user.getCreateDt(), user.getLastConnectDt());
    } else {
      throw new RuntimeException("User not found");
    }
  }

  // 사용자 토큰 생성
  public UserEntity generateToken(String id) {
    Optional<UserEntity> userEntity = userRepository.findById(id);
    if (userEntity.isPresent()) {
      UserEntity user = userEntity.get();
      String token = jwtUtil.createToken(user);
      user.setToken(token);
      return user;
    } else {
      throw new RuntimeException("User not found");
    }
  }

  public void updateLastLogin(String id) {
    Optional<UserEntity> userEntity = userRepository.findById(id);
    if (userEntity.isPresent()) {
      UserEntity user = userEntity.get();
      user.setLastConnectDt(new Date());
      userRepository.save(user);
    }
  }
}
