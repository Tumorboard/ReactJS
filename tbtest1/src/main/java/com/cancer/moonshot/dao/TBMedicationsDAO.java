package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.MedicationsEntity;

public interface TBMedicationsDAO {

	public  List<MedicationsEntity> loadTbMedicationsDetails(int id); 
	
}
