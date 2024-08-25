package com.laboratory.qc_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.laboratory.qc_backend.entity.UserEntity;
import com.laboratory.qc_backend.repository.UserRepository;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
    UserEntity user = userRepository.findById(id).orElseThrow(() ->
      new UsernameNotFoundException("User not found with id: " + id));
    return new org.springframework.security.core.userdetails.User(user.getId(), user.getPassword(), new ArrayList<>());
  }
}
