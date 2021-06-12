package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.PhysicalexaminationEntity;

public interface TBPhysicalexaminationDAO {

	public  List<PhysicalexaminationEntity> loadTbPhysicalexaminationDetails(int id); 
	
}
