package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.BiomarkersEntity;
import com.cancer.moonshot.entity.cancerinfoEntity;
import com.cancer.moonshot.repository.TBBiomarkersRepository;
import com.cancer.moonshot.repository.TBCancerinfoRepository;
import com.google.gson.Gson;
@Component
public class TBcancerinfoRepositoryimpl implements  TBcancerinfoDAO{

	@Autowired
	TBCancerinfoRepository CancerinfoRepo;
	
	@Autowired
	Gson gson;
	
	public List<cancerinfoEntity> loadTbCancerinfoDetails(int id){
		List<cancerinfoEntity> summaryDetails = CancerinfoRepo.findBypatientIdFk(id);
		List<cancerinfoEntity> tbDetails = new ArrayList<>();
		
		summaryDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),cancerinfoEntity.class));
			
		});
		
		return tbDetails;
	}
	

}