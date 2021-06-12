package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.PatientillnessEntity;

public interface TBPatientillnessRepository extends JpaRepository<PatientillnessEntity, String>{


	List<PatientillnessEntity> findBypatientIdFk(int id);
}

