package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.PatientDetailsEntity;
import com.cancer.moonshot.entity.TreatmentHistoryEntity;
import com.cancer.moonshot.pojo.PatientDetails;
import com.cancer.moonshot.pojo.TreatmentHistory;
import com.cancer.moonshot.repository.TreatmentHistoryRepository;
import com.google.gson.Gson;

@Component
public class TreatmentHistoryRepositoryImpl implements TreatmentHistoryDAO{
	
	@Autowired
	TreatmentHistoryRepository treatmentHistoryRepo;
	
	@Autowired
	Gson gson;
	
	
	public List<TreatmentHistory> loadthRecords(int id){
		
		Gson gs ;
		List<TreatmentHistoryEntity> thRecords = treatmentHistoryRepo.findByPatientidOrderByDateDesc(id);
		System.out.println("size: "+thRecords.size()) ;
		
		
		for(TreatmentHistoryEntity th: thRecords) {
		    System.out.println("xxx:"+th);  // Will invoke overrided `toString()` method
		}
		
		
		System.out.println("abc: "+thRecords.toString()) ;
		List<TreatmentHistory> thlist = new ArrayList<>();
		
		thRecords.stream().forEach(th ->{
			
			TreatmentHistory ths = gson.fromJson(gson.toJson(th),TreatmentHistory.class) ;
			System.out.println("outputeach: "+ths.getTherapeutics()) ;
			//if needed we can do operations here and type cast details to final pojo 
			thlist.add(gson.fromJson(gson.toJson(th),TreatmentHistory.class));
			
		});
		System.out.println("output: "+thlist.toString()) ;
		return thlist;
	}

}

