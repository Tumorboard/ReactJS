package com.cancer.moonshot.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.NotificationsEntity;
import com.cancer.moonshot.repository.TBNotificationsRepository;
import com.google.gson.Gson;

@Component
public class TBNotificationsRepositorylmpl implements TBNotificationsDAO{

	@Autowired
	TBNotificationsRepository Notificationsrepo;
	
	@Autowired
	Gson gson;
	
	public List<NotificationsEntity> loadTbNotifications(){
		List<NotificationsEntity> meetingDetails = Notificationsrepo.findAll();
		List<NotificationsEntity> tbDetails = new ArrayList<>();
		
		meetingDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),NotificationsEntity.class));
			
		});
		
		return tbDetails;
	}
}