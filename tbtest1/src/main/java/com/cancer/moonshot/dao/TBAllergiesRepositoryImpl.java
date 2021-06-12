package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.repository.TBAllergiesRepository;
import com.google.gson.Gson;
@Component
public class TBAllergiesRepositoryImpl  implements  TBAllergiesDAO{

	@Autowired
	TBAllergiesRepository AllergiesRepo;
	
	@Autowired
	Gson gson;
	
	public List<AllergiesEntity> loadTbAllergiesDetails(int id){
		List<AllergiesEntity> summaryDetails = AllergiesRepo.findBypatientIdFk(id);
		List<AllergiesEntity> tbDetails = new ArrayList<>();
		
		summaryDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),AllergiesEntity.class));
			
		});
		
		return tbDetails;
	}
	

}



