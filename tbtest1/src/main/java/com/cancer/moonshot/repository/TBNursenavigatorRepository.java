package com.cancer.moonshot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.NurseNavigatorEntity;

@Repository

public interface TBNursenavigatorRepository extends JpaRepository<NurseNavigatorEntity, String>{

	
}

