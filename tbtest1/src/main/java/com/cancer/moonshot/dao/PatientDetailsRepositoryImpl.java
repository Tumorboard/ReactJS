package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.PatientDetailsEntity;
import com.cancer.moonshot.entity.TumorBoardDetailsEntity;
import com.cancer.moonshot.pojo.PatientDetails;
import com.cancer.moonshot.repository.PatientDetailsRepository;
import com.google.gson.Gson;

@Component
public class PatientDetailsRepositoryImpl implements PatientDetailsDAO {
	
	@Autowired
	PatientDetailsRepository patDetsRepo;
	
	@Autowired
	Gson gson;
	
	
	//currently not being used
	public List<PatientDetails> loadPatientDetails(){
		List<PatientDetailsEntity> patientDetails = patDetsRepo.findAll();
		List<PatientDetails> ptDetails = new ArrayList<>();
		
		patientDetails.stream().forEach(pDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			ptDetails.add(gson.fromJson(gson.toJson(pDetails),PatientDetails.class));
			
		});
		
		return ptDetails;
	}
	
	
	public PatientDetails getPatientDetails(int id){
		PatientDetailsEntity patientDetailsEntity = patDetsRepo.findById(id);
		
		//Gson g = new Gson(); 
		// Throwable exception = null;
		
		 
		 PatientDetails pd = gson.fromJson(gson.toJson(patientDetailsEntity), PatientDetails.class) ;
		 
		return pd;
	}
}

