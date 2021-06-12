package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.BiomarkersEntity;

@Repository
public interface TBBiomarkersRepository extends JpaRepository<BiomarkersEntity, String>{
	
	List<BiomarkersEntity> findBypatientIdFk(int id);

}
