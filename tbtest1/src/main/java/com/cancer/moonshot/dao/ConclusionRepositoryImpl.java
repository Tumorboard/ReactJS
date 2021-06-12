
package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.ConclusionEntity;
import com.cancer.moonshot.entity.TumorBoardDetailsEntity;
import com.cancer.moonshot.pojo.MeetingDetails;
import com.cancer.moonshot.pojo.TumorBoardDetails;
import com.cancer.moonshot.repository.ConclusionRepository;
import com.cancer.moonshot.repository.TBMettingsRepository;
import com.google.gson.Gson;

@Component
public class ConclusionRepositoryImpl implements ConclusionDAO {
	
	@Autowired
	ConclusionRepository conclRepo;
	
	@Autowired
	Gson gson;

@Override
public void save(ConclusionEntity concl) throws Throwable  {
    // TODO Auto-generated method stub
	 Throwable exception = null;
	 try {
		 conclRepo.save(concl);
	 }
	 catch(Throwable e) {
		exception = e;
		System.out.println(e.toString()) ;
	}
	
    return ;
}
}
