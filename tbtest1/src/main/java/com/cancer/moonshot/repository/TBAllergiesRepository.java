package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.AllergiesEntity;

@Repository

public interface TBAllergiesRepository extends JpaRepository<AllergiesEntity, String>{
	
	List<AllergiesEntity> findBypatientIdFk(int id);

}
