
package com.cancer.moonshot.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.ConclusionEntity;




@Repository
public interface ConclusionRepository extends JpaRepository<ConclusionEntity, String>{
	


	//TumorBoardDetailsEntity save(TumorBoardDetailsEntity md);
	


}

