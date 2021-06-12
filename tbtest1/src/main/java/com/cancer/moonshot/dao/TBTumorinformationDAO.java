package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.TumorinformationEntity;

public interface TBTumorinformationDAO {

	public  List<TumorinformationEntity> loadTbTumorinformationDetails(int id); 
	
}
