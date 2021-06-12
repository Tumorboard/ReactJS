package com.cancer.moonshot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.DoctorsDetailsEntity;

@Repository
public interface DoctorsDetailsRepository extends JpaRepository<DoctorsDetailsEntity, String>{

	//DoctorsDetailsEntity save(TumorBoardDetailsEntity md);
	
	

}

