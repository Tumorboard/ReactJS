package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.ComorbiditiesEntity;

public interface TBComorbiditiesDAO {
	
	public  List<ComorbiditiesEntity> loadTbComorbiditiesDetails(int id); 

}
