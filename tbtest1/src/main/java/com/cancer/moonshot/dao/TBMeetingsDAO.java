package com.cancer.moonshot.dao;

import java.util.List;

import com.cancer.moonshot.entity.TumorBoardDetailsEntity;
import com.cancer.moonshot.pojo.TumorBoardDetails;

//import com.cancer.moonshot.pojo.MeetingDetails;

public interface TBMeetingsDAO {
	
	public List<TumorBoardDetails> loadTbMettingDetails();
	
	public List<TumorBoardDetails>  loadTodaysMeetingDetails();

	public TumorBoardDetailsEntity save(TumorBoardDetailsEntity md) throws Throwable;
	
	public TumorBoardDetails  loadTumorboardDetails(int tbid);
	
//	public void  deleteTBRecord(int tbid) throws Throwable;

	
	//public void createTB(String... args) throws Exception;
	
	//MeetingDetails save(MeetingDetails md);

}
