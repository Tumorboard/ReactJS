package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.BiomarkersEntity;
import com.cancer.moonshot.repository.TBBiomarkersRepository;
import com.google.gson.Gson;
@Component
public class TBBiomarkersRepositioryimpl  implements  TBBiomarkersDAO{

	@Autowired
	TBBiomarkersRepository BiomarkersRepo;
	
	@Autowired
	Gson gson;
	
	public List<BiomarkersEntity> loadTbBiomarkersDetails(int id){
		List<BiomarkersEntity> summaryDetails = BiomarkersRepo.findBypatientIdFk(id);
		List<BiomarkersEntity> tbDetails = new ArrayList<>();
		
		summaryDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),BiomarkersEntity.class));
			
		});
		
		return tbDetails;
	}
	

}



