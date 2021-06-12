package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.cancerinfoEntity;

@Repository

public interface TBCancerinfoRepository extends JpaRepository<cancerinfoEntity, String>{

	List<cancerinfoEntity> findBypatientIdFk(int id);
}
