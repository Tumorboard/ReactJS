package com.cancer.moonshot.dao;


import java.util.List;

import com.cancer.moonshot.pojo.TreatmentHistory;

public interface TreatmentHistoryDAO {
	
	public List<TreatmentHistory> loadthRecords(int id);

}

