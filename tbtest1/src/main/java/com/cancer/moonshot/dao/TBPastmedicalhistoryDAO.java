package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.PastmedicalhistoryEntity;

public interface TBPastmedicalhistoryDAO {

	public  List<PastmedicalhistoryEntity> loadTbPastmedicalhistoryDetails(int id); 
	
}
