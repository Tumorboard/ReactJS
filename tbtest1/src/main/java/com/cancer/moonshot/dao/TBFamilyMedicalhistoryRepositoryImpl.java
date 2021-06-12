package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.FamilymedicalhistoryEntity;
import com.cancer.moonshot.repository.TBFamiliymedicalhistoryReository;
import com.google.gson.Gson;


@Component
public class TBFamilyMedicalhistoryRepositoryImpl implements  TBFamilyMedicalhistoryDAO{

	@Autowired
	TBFamiliymedicalhistoryReository FamilyDetailsRepo;
	
	@Autowired
	Gson gson;
	
	public List<FamilymedicalhistoryEntity> loadTbFamilymedicalhistoryDetails(int id){
		List<FamilymedicalhistoryEntity> summaryDetails = FamilyDetailsRepo.findBypatientIdFk(id);
		List<FamilymedicalhistoryEntity> tbDetails = new ArrayList<>();
		
		summaryDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),FamilymedicalhistoryEntity.class));
			
		});
		
		return tbDetails;
	}
	

}
