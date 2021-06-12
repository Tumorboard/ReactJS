package com.cancer.moonshot.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.TimelineEntity;

@Repository
public interface TimelineRepository extends JpaRepository<TimelineEntity, String>{
	
	List<TimelineEntity> findByPatientidOrderByDateDesc(int id); 
	

}

