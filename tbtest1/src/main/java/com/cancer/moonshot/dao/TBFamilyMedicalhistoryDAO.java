package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.FamilymedicalhistoryEntity;


public interface TBFamilyMedicalhistoryDAO {
	
	public  List<FamilymedicalhistoryEntity> loadTbFamilymedicalhistoryDetails(int id); 

}
