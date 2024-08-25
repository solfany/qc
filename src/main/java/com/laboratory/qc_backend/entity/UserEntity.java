package com.laboratory.qc_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "user")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userUid;
  private String id;
  private String name;
  private String password;
  private String phone;
  private String email;
  private Date createDt;
  private Date lastConnectDt;
  private String role;

  @Transient
  private String token;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ChecklistEntity> checklists;
}
