package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.ComorbiditiesEntity;
import com.cancer.moonshot.repository.TBComorbiditiesRepository;
import com.google.gson.Gson;
@Component
public class TBComorbiditiesRepositoryImpl implements  TBComorbiditiesDAO{

	@Autowired
	TBComorbiditiesRepository ComorbiditiesRepo;
	
	@Autowired
	Gson gson;
	
	public List<ComorbiditiesEntity> loadTbComorbiditiesDetails(int id){
		List<ComorbiditiesEntity> summaryDetails = ComorbiditiesRepo.findBypatientIdFk(id);
		List<ComorbiditiesEntity> tbDetails = new ArrayList<>();
		
		summaryDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),ComorbiditiesEntity.class));
			
		});
		
		return tbDetails;
	}
	

}