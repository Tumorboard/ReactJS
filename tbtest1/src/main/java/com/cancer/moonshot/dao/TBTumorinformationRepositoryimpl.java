package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.PatientillnessEntity;
import com.cancer.moonshot.entity.PhysicalexaminationEntity;
import com.cancer.moonshot.entity.TumorinformationEntity;
import com.cancer.moonshot.repository.TBPatientillnessRepository;
import com.cancer.moonshot.repository.TBPhysicalexaminationRepository;
import com.cancer.moonshot.repository.TBTumorinformationRepository;
import com.google.gson.Gson;
@Component
public class TBTumorinformationRepositoryimpl implements  TBTumorinformationDAO{

	@Autowired
	TBTumorinformationRepository TumorinformationRepo;
	
	@Autowired
	Gson gson;
	
	public List<TumorinformationEntity> loadTbTumorinformationDetails(int id){
		List<TumorinformationEntity> summaryDetails = TumorinformationRepo.findBypatientIdFk(id);
		List<TumorinformationEntity> tbDetails = new ArrayList<>();
		
		summaryDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),TumorinformationEntity.class));
			
		});
		
		return tbDetails;
	}
	

}