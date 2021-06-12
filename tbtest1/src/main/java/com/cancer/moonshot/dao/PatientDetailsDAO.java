package com.cancer.moonshot.dao;

import java.util.List;


import com.cancer.moonshot.pojo.PatientDetails;

public interface PatientDetailsDAO {
	
	public List<PatientDetails> loadPatientDetails();
	
	
	public PatientDetails getPatientDetails(int id) ;

}


