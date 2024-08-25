package com.laboratory.qc_backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDto {
  private String name;
  private String id;
  private String password;
  private String phone;
  private String email;
  private Date createDt;
  private Date lastConnectDt;

  public UserDto(String name, String id, String password, String phone, String email, Date createDt, Date lastConnectDt) {
    this.name = name;
    this.id = id;
    this.password = password;
    this.phone = phone;
    this.email = email;
    this.createDt = createDt;
    this.lastConnectDt = lastConnectDt;
  }
}
