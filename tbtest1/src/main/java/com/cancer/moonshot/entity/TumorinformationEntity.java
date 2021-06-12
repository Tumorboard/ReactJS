package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name= "tumorinformation",schema ="")
public class TumorinformationEntity {
	
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="patient_id_fk")
	private int patientIdFk;
	
	@Column(name="size")
	private String size;
	
	@Column(name="margin")
	private String margin;
	
	@Column(name="lymphnodes")
	private String lymphnodes;
	
		
}
	
	