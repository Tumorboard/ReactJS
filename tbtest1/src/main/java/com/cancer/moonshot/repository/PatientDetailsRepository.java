
package com.cancer.moonshot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.PatientDetailsEntity;
import com.cancer.moonshot.pojo.PatientDetails;

@Repository
public interface PatientDetailsRepository extends JpaRepository<PatientDetailsEntity, String>{

	//PatientDetailsEntity save(TumorBoardDetailsEntity md);
	
	PatientDetailsEntity findById(int id);
	

}

