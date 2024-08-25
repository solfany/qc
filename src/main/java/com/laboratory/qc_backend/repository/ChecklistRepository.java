package com.laboratory.qc_backend.repository;

import com.laboratory.qc_backend.entity.ChecklistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistRepository extends JpaRepository<ChecklistEntity, Long> {
}
