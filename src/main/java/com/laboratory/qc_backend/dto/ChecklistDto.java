package com.laboratory.qc_backend.dto;


import lombok.Data;

@Data
public class ChecklistDto {
  private Long id;
  private String title;


  public ChecklistDto(Long id, String title) {
    this.id = id;
    this.title = title;
  }

}
