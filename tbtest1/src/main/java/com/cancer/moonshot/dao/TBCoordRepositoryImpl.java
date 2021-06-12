package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.Coordinator_detailsEntity;
import com.cancer.moonshot.repository.TBCoordinatorRepository;
import com.google.gson.Gson;


@Component
public class TBCoordRepositoryImpl implements TBCoordinatorDAO{
	@Autowired
	TBCoordinatorRepository CoordinatorRepo;
	
	@Autowired
	Gson gson;
	
	public List<Coordinator_detailsEntity> loadTbCoordinator_details(){
		List<Coordinator_detailsEntity> meetingDetails = CoordinatorRepo.findAll();
		List<Coordinator_detailsEntity> tbDetails1 = new ArrayList<>();
		
		meetingDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails1.add(gson.fromJson(gson.toJson(tumorBoardDetails),Coordinator_detailsEntity.class));
			
		});
		
		return tbDetails1;
	}

}
