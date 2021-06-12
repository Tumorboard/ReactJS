package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.PatientillnessEntity;

public interface TBPatientillnessDAO {

	public  List<PatientillnessEntity> loadTbPatientillnessDetails(int id); 
	
}
