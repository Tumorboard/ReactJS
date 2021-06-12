package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name= "biomarkers",schema ="")
public class BiomarkersEntity {
	
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="patient_id_fk")
	private int patientIdFk;
	@Column(name="type")
	private String type;
	
	@Column(name="result")
	private String result;
	
	@Column(name="value")
	private String value;
	
	@Column(name="unit")
	private String unit;
	
		
}
	
	