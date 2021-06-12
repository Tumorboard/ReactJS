package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.FamilymedicalhistoryEntity;


	
	@Repository
	public interface TBFamiliymedicalhistoryReository extends JpaRepository<FamilymedicalhistoryEntity, String>{
		List<FamilymedicalhistoryEntity> findBypatientIdFk(int id);

}
