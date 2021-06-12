package com.cancer.moonshot.pojo;

import lombok.Data;

@Data
public class Video {
	
	private int slno;
	private int accountsid;
	private String roomsid;
	private int doctorid;
	private int patientid;
	private String roomname;
	private String time_created;
	private String time_ended;
	private String time_doctor_joined;
	private String time_doctor_left;
	private String time_patient_joined;
	private String time_patient_left;
	private String duration;
	private String doctor_duration;
	private String patient_duration;
	private String doctorstatus;
	private String patientstatus;
	private String roomstatus;
	private String videouri;

}
