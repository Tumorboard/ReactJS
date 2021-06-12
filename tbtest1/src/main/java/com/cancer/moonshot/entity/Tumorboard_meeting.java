package com.cancer.moonshot.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@Table(name="tumorboard_meeting")
public class Tumorboard_meeting {
	public enum Status {
		REQUESTED,CONFIRMED,CANCELED,STARTED,COMPLETED,DELETED;
	}
	public enum Mode {
		AUDIO,VIDEO,INPERSON;
	}

	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="purpose")
	private String purpose;
	
	@JsonFormat(pattern ="dd-MM-yyyy", shape = Shape.STRING)
	@Column(name="start_time")
	private String start_time;
	
	@Column(name="end_time")
	private Timestamp end_time;
	
	//@Column(name="mode")
	//private String tumorboardMode;
	@Enumerated(EnumType.STRING)
    private Mode mode;
	
	@Column(name="location")
	private String location;
	
	@Column(name="video_link")
	private String video_link;
	
	//@Column(name="status")
	//private String tumorboardStatus;
	@Enumerated(EnumType.ORDINAL)
    private Status status;
	
	@Column(name="priority")
	private int priority;
	
	@Column(name="frequency_in_days")
	private int frequency_in_days;
	
	@Column(name="notes")
	private String notes;
	
	@Column(name="requested_time")
	private Timestamp requested_time;
	
	@Column(name="confirmed_time")
	private Timestamp confirmed_time;
	
	@Column(name="canceled_time")
	private Timestamp canceled_time;
	
	@Column(name="completed_time")
	private Timestamp completed_time;
	
	@Column(name="inserted_time")
	private Timestamp inserted_time;
	
	@Column(name="updated_time")
	private Timestamp updated_time;
	
}
