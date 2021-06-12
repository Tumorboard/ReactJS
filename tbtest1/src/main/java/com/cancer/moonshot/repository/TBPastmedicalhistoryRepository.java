package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.PastmedicalhistoryEntity;

public interface TBPastmedicalhistoryRepository extends JpaRepository<PastmedicalhistoryEntity, String>{
	List<PastmedicalhistoryEntity> findBypatientIdFk(int id);
}
