package com.cancer.moonshot.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="tm_doctors")
public class Tm_doctors {
	
	public enum Type {
		REQUIRED,OPTIONAL,ORGANIZER;
	}
	public enum Status {
		PENDING,CONFIRMED,CANCELED;
	}
	
	@Id
	@Column(name="id")
	private int tmId;
	
	@Column(name="meeting_id_fk")
	private int tmMeeting_id_fk;
	
	@Column(name="doctor_id_fk")
	private int tmDoctor_id_fk;
	
	//@Column(name="type")
	//private String tmType;
	@Enumerated(EnumType.STRING)
    private Type tmType;
	
	//@Column(name="status")
	//private String tmStatus;
	@Enumerated(EnumType.ORDINAL)
    private Status tmStatus;
	
	@Column(name="confirmed_time")
	//private double tmconfirmed_time;
	private Timestamp tmConfirmed_time;
	
	@Column(name="canceled_time")
	//private double tmcanceled_time;
	private Timestamp tmCanceled_time;
	
	@Column(name="comments")
	private String tmComments;
	
	@Column(name="inserted_time")
	//private double tminserted_time;
	private Timestamp tmInserted_time;
	
	@Column(name="updated_time")
	//private double tmupdated_time;
	private Timestamp tmUpdated_time;
	
}
