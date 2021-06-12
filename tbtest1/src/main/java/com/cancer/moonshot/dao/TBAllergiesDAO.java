package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.AllergiesEntity;

public interface TBAllergiesDAO {

	public  List<AllergiesEntity> loadTbAllergiesDetails(int id); 
	
}
