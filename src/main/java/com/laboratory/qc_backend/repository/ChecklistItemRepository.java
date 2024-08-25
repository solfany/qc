package com.laboratory.qc_backend.repository;

import com.laboratory.qc_backend.entity.ChecklistItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChecklistItemRepository extends JpaRepository<ChecklistItemEntity, Long> {
}
