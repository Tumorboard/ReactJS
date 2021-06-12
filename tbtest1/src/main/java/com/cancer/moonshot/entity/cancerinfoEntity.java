package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name= "cancerinfo",schema ="")
public class cancerinfoEntity {
	
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="patient_id_fk")
	private int patientIdFk;
	
	@Column(name="organ")
	private String organ;
	
	@Column(name="cancertype")
	private String cancertype;
	
	@Column(name="stage")
	private String stage;
	
	
	
		
}
	
	