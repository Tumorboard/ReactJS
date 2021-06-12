package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.PastmedicalhistoryEntity;
import com.cancer.moonshot.entity.PatientillnessEntity;
import com.cancer.moonshot.repository.TBPastmedicalhistoryRepository;
import com.cancer.moonshot.repository.TBPatientillnessRepository;
import com.google.gson.Gson;
@Component
public class TBPastmedicalhistoryRepositoryimpl implements  TBPastmedicalhistoryDAO{

	@Autowired
	TBPastmedicalhistoryRepository PastmedicalhistoryRepo;
	
	@Autowired
	Gson gson;
	
	public List<PastmedicalhistoryEntity> loadTbPastmedicalhistoryDetails(int id){
		List<PastmedicalhistoryEntity> summaryDetails = PastmedicalhistoryRepo.findBypatientIdFk(id);
		List<PastmedicalhistoryEntity> tbDetails = new ArrayList<>();
		
		summaryDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),PastmedicalhistoryEntity.class));
			
		});
		
		return tbDetails;
	}
	

}