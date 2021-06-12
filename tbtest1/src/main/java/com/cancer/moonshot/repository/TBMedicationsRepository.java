package com.cancer.moonshot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.MedicationsEntity;

public interface TBMedicationsRepository extends JpaRepository<MedicationsEntity, String>{

	List<MedicationsEntity> findBypatientIdFk(int id);

}
