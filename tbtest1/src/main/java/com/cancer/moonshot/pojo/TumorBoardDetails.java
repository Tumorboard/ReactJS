package com.cancer.moonshot.pojo;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class TumorBoardDetails {
	@Id
	private int tbid;
	private String name;
	private String purpose;
	private String start_time;
	private int duration;
	private String mode;
	private String location;
	private String video_link;
	private String status;
	private String priority;
	private int frequency_in_days;
	private String notes;
	private String inserted_time;
	private int patientIdFk;
	private String presenting_doc;
	private String attending_doc;
	private String patientname;
	private String doctorName;
	
	
	public TumorBoardDetails(int tbid, String name, String purpose, String start_time, int duration, String mode,
			String location, String video_link, String status, String priority, int frequency_in_days, String notes,
			String inserted_time,int patientIdFk, String presenting_doc, String attending_doc, String patientname, String doctorName) {
		
		super();
		this.tbid = tbid;
		this.name = name;
		this.purpose = purpose;
		this.start_time = start_time;
		this.duration = duration;
		this.mode = mode;
		this.location = location;
		this.video_link = video_link;
		this.status = status;
		this.priority = priority;
		this.frequency_in_days = frequency_in_days;
		this.notes = notes;
		this.inserted_time= inserted_time;
		this.patientIdFk = patientIdFk;
		this.presenting_doc = presenting_doc;
		this.attending_doc = attending_doc;
		this.patientname = patientname;
		this.doctorName = doctorName;
	}

	

	public String getAttending_doc() {
		return attending_doc;
	}
	public void setAttending_doc(String attending_doc) {
		this.attending_doc = attending_doc;
	}
}
