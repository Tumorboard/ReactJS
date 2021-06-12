package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.CheckConclusionEntity;

@Repository

public interface CheckConclusionRepository extends JpaRepository<CheckConclusionEntity, String>{
	
	List<CheckConclusionEntity> findBypatientIdFk(int id);

}
