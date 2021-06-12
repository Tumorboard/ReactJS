

package com.cancer.moonshot.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table (name = "conclusion" , schema ="")
public class ConclusionEntity implements Serializable{

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column()
	private String type;	
	
	private String notes;
	private String nextaction ;
	private String date_time ;
	private String responsible;
	
	private String nursenav;
	
	private String priority;
	private String feedback;
	@Column(name = "patient_id_fk")
	private int patientIdFk;
	private String dr_id;
	public String getDate_time() {
		return date_time;
	}
	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}
	
}



