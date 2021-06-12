package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="videoconvo",schema ="")
public class VideoconvoEntity {
	
	@Id
	@Column(name="slno")
	private int slno;
	
	@Column(name="accountsid")
	private int accountsid;
	
	@Column(name="roomsid")
	private String roomsid;
	
	@Column(name="doctorid")
	private int doctorid;
	
	@Column(name="patientid")
	private int patientid;
	
	@Column(name="roomname")
	private String roomname;
	
	@Column(name="time_created")
	private String time_created;
	
	@Column(name="time_ended")
	private String time_ended;
	
	@Column(name="time_doctor_joined")
	private String time_doctor_joined;
	
	@Column(name="time_doctor_left")
	private String time_doctor_left;
	
	@Column(name="time_patient_joined")
	private String time_patient_joined;
	
	@Column(name="time_patient_left")
	private String time_patient_left;
	
	@Column(name="duration")
	private String duration;
	
	@Column(name="doctor_duration")
	private String doctor_duration;
	
	@Column(name="patient_duration")
	private String patient_duration;
	
	@Column(name="doctorstatus")
	private String doctorstatus;
	
	@Column(name="patientstatus")
	private String patientstatus;
	
	@Column(name="roomstatus")
	private String roomstatus;
	
	@Column(name="videouri")
	private String videouri;

}
