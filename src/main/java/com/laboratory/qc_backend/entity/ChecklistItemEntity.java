package com.laboratory.qc_backend.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "checklist_items")
public class ChecklistItemEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String category;
  private String text;
  private String status;
  private Date createDt;
  private Date updateDt;

  @ManyToOne
  @JoinColumn(name = "checklist_id", nullable = false)
  private ChecklistEntity checklist;


  @ManyToOne
  @JoinColumn(name = "user_uid", nullable = false)
  private UserEntity user;

}
