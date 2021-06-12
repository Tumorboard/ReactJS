package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name= "pastmedicalhistory",schema ="")
public class PastmedicalhistoryEntity {
	
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="patient_id_fk")
	private int patientIdFk;
	
	@Column(name="date")
	private String date;
	
	@Column(name="information")
	private String information;
	
	
	
		
}
	
	