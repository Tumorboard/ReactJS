package com.cancer.moonshot.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.PatientDetailsEntity;
import com.cancer.moonshot.entity.TreatmentHistoryEntity;
import com.cancer.moonshot.pojo.TreatmentHistory;

@Repository
public interface TreatmentHistoryRepository extends JpaRepository<TreatmentHistoryEntity, String>{
	
	List<TreatmentHistoryEntity> findByPatientidOrderByDateDesc(int id);
	

}

