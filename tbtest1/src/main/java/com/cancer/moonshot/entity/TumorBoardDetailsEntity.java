package com.cancer.moonshot.entity;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table (name = "tumorboard_meeting" )
public class TumorBoardDetailsEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int tbid;
	
	@Column()
	private String name;
	private String purpose;
	private String start_time;
	private int duration;
	private String end_time;
	private String mode;
	private String location;
	private String video_link;
	private String status;
	private String priority;
	private int frequency_in_days;
	private String notes;
	private String requested_time;
	private String confirmed_time;
	private String cancelled_time;
	private String completed_time;
	private String inserted_time;
	private String updated_time;
	@Column(name = "patient_id_fk")
	private int patientIdFk;
	private String presenting_doc ;
	private String attending_doc ;
	
	
	public int getTbid() {
		return tbid;
	}

	public void setTbid(int tbid) {
		this.tbid = tbid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getVideo_link() {
		return video_link;
	}

	public void setVideo_link(String video_link) {
		this.video_link = video_link;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public int getFrequency_in_days() {
		return frequency_in_days;
	}

	public void setFrequency_in_days(int frequency_in_days) {
		this.frequency_in_days = frequency_in_days;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getConfirmed_time() {
		return confirmed_time;
	}

	public void setConfirmed_time(String confirmed_time) {
		this.confirmed_time = confirmed_time;
	}

	public String getCancelled_time() {
		return cancelled_time;
	}

	public void setCancelled_time(String cancelled_time) {
		this.cancelled_time = cancelled_time;
	}

	public String getCompleted_time() {
		return completed_time;
	}

	public void setCompleted_time(String completed_time) {
		this.completed_time = completed_time;
	}

	public String getInserted_time() {
		return inserted_time;
	}

	public void setInserted_time(String inserted_time) {
		this.inserted_time = inserted_time;
	}

	public String getUpdated_time() {
		return updated_time;
	}

	public void setUpdated_time(String updated_time) {
		this.updated_time = updated_time;
	}

	public int getPatientIdFk() {
		return patientIdFk;
	}

	public void setPatientIdFk(int patientIdFk) {
		this.patientIdFk = patientIdFk;
	}

	public String getAttending_doc() {
		return attending_doc;
	}

	public void setAttending_doc(String attending_doc) {
		this.attending_doc = attending_doc;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getRequested_time() {
		return requested_time;
	}

	public void setRequested_time(String requested_time) {
		this.requested_time = requested_time;
	}
	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	public String getPresenting_doc() {
		return presenting_doc;
	}

	public void setPresenting_doc(String presenting_doc) {
		this.presenting_doc = presenting_doc;
	}
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public boolean isPresent() {
		// TODO Auto-generated method stub
		return true;
	}
	@PrePersist
	  protected void onCreate() {
		 java.util.Date dt = new Date();
		 DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		 inserted_time = dateFormat.format(dt);
		 
	  }

	  @PreUpdate
	  protected void onUpdate() {
		  java.util.Date dt = new Date();
			 DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			 updated_time = dateFormat.format(dt);
		 
	  }
}
