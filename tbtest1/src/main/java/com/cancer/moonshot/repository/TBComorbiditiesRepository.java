package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.ComorbiditiesEntity;

@Repository

public interface TBComorbiditiesRepository extends JpaRepository<ComorbiditiesEntity, String>{

	List<ComorbiditiesEntity> findBypatientIdFk(int id);
}

