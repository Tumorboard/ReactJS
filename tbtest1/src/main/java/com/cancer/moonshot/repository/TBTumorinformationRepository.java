package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.TumorinformationEntity;

public interface TBTumorinformationRepository extends JpaRepository<TumorinformationEntity, String>{

	List<TumorinformationEntity> findBypatientIdFk(int id);
}
