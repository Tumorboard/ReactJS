package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.MedicationsEntity;
import com.cancer.moonshot.repository.TBMedicationsRepository;
import com.google.gson.Gson;
@Component
public class TBMedicationsRepositoryImpl implements  TBMedicationsDAO{

	@Autowired
	TBMedicationsRepository MedicationsRepo;
	
	@Autowired
	Gson gson;
	
	public List<MedicationsEntity> loadTbMedicationsDetails(int id){
		List<MedicationsEntity> summary = MedicationsRepo.findBypatientIdFk(id);
		List<MedicationsEntity> tbDetails = new ArrayList<>();
		
		summary.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),MedicationsEntity.class));
			
		});
		
		return tbDetails;
	}
	
	
}


