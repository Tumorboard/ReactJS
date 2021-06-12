package com.cancer.moonshot.dao;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.DoctorsDetailsEntity;

import com.cancer.moonshot.pojo.DoctorsDetails;
import com.cancer.moonshot.repository.DoctorsDetailsRepository;
import com.google.gson.Gson;

@Component
public class DoctorsDetailsRepositoryImpl implements DoctorsDetailsDAO {
	
	@Autowired
	DoctorsDetailsRepository docsDetsRepo;
	
	@Autowired
	Gson gson;
	
	
	public List<DoctorsDetails> loadDoctorsDetails(){
		List<DoctorsDetailsEntity> doctorsDetails = docsDetsRepo.findAll();
		List<DoctorsDetails> docDetails = new ArrayList<>();
		
		doctorsDetails.stream().forEach(docDetail ->{
			//if needed we can do operations here and type cast details to final pojo 
			docDetails.add(gson.fromJson(gson.toJson(docDetail),DoctorsDetails.class));
			
		});
		
		return docDetails;
	}
		

}

