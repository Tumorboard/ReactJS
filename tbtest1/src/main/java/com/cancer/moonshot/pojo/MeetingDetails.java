package com.cancer.moonshot.pojo;

import lombok.Data;

@Data
public class MeetingDetails {
	
private int tbid;
	
	
	private String name;
	private String purpose;
	private String start_time;
	private int duration ;
	private String end_time;
	
	private String mode;
	private String location;
	private String video_link;
	private String status;
	
	
	private int priority;
	private int frequency_in_days;
	
	private String notes;
	
	private String requested_time;
	private String confirmed_time;
	private String cancelled_time;
	private String completed_time;
	private String inserted_time;
	private String updated_time;
	
	private int patientIdFk;
	
	private String presenting_doc ;
	private String attending_doc ;

}