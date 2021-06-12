package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cancer.moonshot.entity.PhysicalexaminationEntity;

public interface TBPhysicalexaminationRepository extends JpaRepository<PhysicalexaminationEntity, String>{

	List<PhysicalexaminationEntity> findBypatientIdFk(int id);
}
