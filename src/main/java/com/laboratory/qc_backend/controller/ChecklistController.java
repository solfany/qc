package com.laboratory.qc_backend.controller;

import com.laboratory.qc_backend.entity.ChecklistEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.laboratory.qc_backend.service.ChecklistService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ChecklistController {

  @Autowired
  private ChecklistService checklistService;

  @GetMapping("/checklists")
  public ResponseEntity<List<ChecklistEntity>> getAllChecklists() {
    List<ChecklistEntity> checklists = checklistService.getAllChecklists();
    return ResponseEntity.ok(checklists);
  }
}
