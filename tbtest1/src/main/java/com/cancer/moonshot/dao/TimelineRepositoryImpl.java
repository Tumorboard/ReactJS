package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.TimelineEntity;
import com.cancer.moonshot.pojo.Timeline;
import com.cancer.moonshot.repository.TimelineRepository;
import com.google.gson.Gson;

@Component
public class TimelineRepositoryImpl implements TimelineDAO{
	
	@Autowired
	TimelineRepository timelineRepo;
	
	@Autowired
	Gson gson;
	
	
	public List<Timeline> loadTimelineRecords(int id){

		List<TimelineEntity> timelineRecords = timelineRepo.findByPatientidOrderByDateDesc(id);
		System.out.println("size: "+timelineRecords.size()) ;
		List<Timeline> timelineList = new ArrayList<>();
		
		timelineRecords.stream().forEach(th ->{
			timelineList.add(gson.fromJson(gson.toJson(th),Timeline.class));
			});
		return timelineList;
	}

}


