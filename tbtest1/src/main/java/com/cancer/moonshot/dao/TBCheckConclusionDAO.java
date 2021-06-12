package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.CheckConclusionEntity;

public interface TBCheckConclusionDAO {

	public  List<CheckConclusionEntity> loadCheckConclusionDetails(int id); 
	
}
