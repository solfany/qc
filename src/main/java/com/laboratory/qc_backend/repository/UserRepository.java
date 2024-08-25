package com.laboratory.qc_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.laboratory.qc_backend.entity.UserEntity;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByIdAndPassword(String id, String password);
  Optional<UserEntity> findById(String id);
}
