package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.CheckConclusionEntity;
import com.cancer.moonshot.repository.CheckConclusionRepository;
import com.google.gson.Gson;
@Component
public class TBCheckConclusionRepositoryImpl  implements  TBCheckConclusionDAO{

	@Autowired
	CheckConclusionRepository CheckConclusionRepo;
	
	@Autowired
	Gson gson;
	
	public List<CheckConclusionEntity> loadCheckConclusionDetails(int id){
		List<CheckConclusionEntity> tumorbDetails = CheckConclusionRepo.findBypatientIdFk(id);
		List<CheckConclusionEntity> tbDetails = new ArrayList<>();
		
		tumorbDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),CheckConclusionEntity.class));
			
		});
		
		return tbDetails;
	}
	

}



