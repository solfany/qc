package com.laboratory.qc_backend.service;

import com.laboratory.qc_backend.entity.ChecklistEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.laboratory.qc_backend.repository.ChecklistRepository;

import java.util.List;

@Service
public class ChecklistService {

  @Autowired
  private ChecklistRepository checklistRepository;

  public List<ChecklistEntity> getAllChecklists() {
    return checklistRepository.findAll();
  }
}
