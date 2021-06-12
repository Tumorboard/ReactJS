package com.cancer.moonshot.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="activity_messages")
public class Activity_messages {
	public enum User_Status {
		INITIATOR,READ,UNREAD;
	}
	
	public enum Doctor_status {
		INITIATOR,READ,UNREAD;
	}
	
	public enum Coordinator_status {
		INITIATOR,READ,UNREAD;
	}
	
	public enum Admin_status {
		INITIATOR,READ,UNREAD;
	}
	
	@Id
	@Column(name="id")
	private int activityId;
	
	@Column(name="title")
	private String activityTitle;
	
	@Column(name="message")
	private String activityMessage;
	
	@Column(name="status")
	private int activityStatus;
	
	@Column(name="user_id")
	private int activityUser_id;
	
	@Enumerated(EnumType.STRING)
    private User_Status activityUser_Status;
	
	@Column(name="user_time")
	private Timestamp activityUser_time;
	
	@Column(name="doctor_id")
	private int activityDoctor_id;
	
	@Enumerated(EnumType.STRING)
    private Doctor_status activityDoctor_status;
	
	@Column(name="doctor_time")
	private Timestamp activityDoctor_time;
	
	@Column(name="coordinator_id")
	private int activityCoordinator_id;
	
	@Enumerated(EnumType.STRING)
    private Coordinator_status activityCoordinator_status;
	
	
	@Column(name="coordinator_time")
	private Timestamp activityCoordinator_time;
	
	@Column(name="admin_id")
	private int activityAdmin_id;
	
	@Enumerated(EnumType.STRING)
    private Admin_status activityAdmin_status;
	
	@Column(name="admin_time")
	private Timestamp activityAdmin_time;
	
	@Column(name="inserted_time")
	private Timestamp activityInserted_time;
	
	@Column(name="updated_time")
	private Timestamp activityUpdated_time;
	
	
	

}
