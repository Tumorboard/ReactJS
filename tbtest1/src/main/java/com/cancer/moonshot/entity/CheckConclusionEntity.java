package com.cancer.moonshot.entity;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name= "conclusion",schema ="")
public class CheckConclusionEntity {
	
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="patient_id_fk")
	private int patientIdFk;
	
	@Column(name="type")
	private String type;
	
	
	@Column(name="notes")
	private String notes;
	
	@Column(name="nextaction")
	private String nextaction;
	
	@Column(name="date_time")
	private String date_time;
	
	@Column(name="responsible")
	private String responsible;
	
	@Column(name="nursenav")
	private String nursenav;
	
	@Column(name="priority")
	private String priority;
	
	@Column(name="feedback")
	private String feedback;
	
	@Column(name="dr_id")
	private String dr_id;
		
	
}
	
	