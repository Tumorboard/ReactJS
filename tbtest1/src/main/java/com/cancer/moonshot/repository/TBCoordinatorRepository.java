package com.cancer.moonshot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.Coordinator_detailsEntity;

@Repository
public interface TBCoordinatorRepository extends JpaRepository<Coordinator_detailsEntity, String>{

}
