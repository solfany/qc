package com.laboratory.qc_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "checklist")
public class ChecklistEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  @Temporal(TemporalType.TIMESTAMP)
  private Date createDt;

  @Temporal(TemporalType.TIMESTAMP)
  private Date updateDt;

  @ManyToOne
  @JoinColumn(name = "user_uid", nullable = false)
  private UserEntity user;

  @OneToMany(mappedBy = "checklist", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ChecklistItemEntity> items;
}
