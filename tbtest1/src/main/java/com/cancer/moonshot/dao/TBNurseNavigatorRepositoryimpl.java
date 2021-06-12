package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.NurseNavigatorEntity;
import com.cancer.moonshot.repository.TBNursenavigatorRepository;
import com.google.gson.Gson;
@Component
public class TBNurseNavigatorRepositoryimpl implements TBNurseNavigatorDAO{

	@Autowired
	TBNursenavigatorRepository NursenavigatorRepo;
	
	@Autowired
	Gson gson;
	
	public List<NurseNavigatorEntity> loadTbNurseNavigator(){
		List<NurseNavigatorEntity> summaryDetails = NursenavigatorRepo.findAll();
		List<NurseNavigatorEntity> tbDetails = new ArrayList<>();
		
		summaryDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),NurseNavigatorEntity.class));
			
		});
		
		return tbDetails;
	}
	

}
