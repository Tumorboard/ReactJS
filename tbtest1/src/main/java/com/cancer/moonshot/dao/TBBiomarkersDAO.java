package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.BiomarkersEntity;

public interface TBBiomarkersDAO {

	public  List<BiomarkersEntity> loadTbBiomarkersDetails(int id); 
	
}
