package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name= "physicalexamination",schema ="")
public class PhysicalexaminationEntity {
	
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="patient_id_fk")
	private int patientIdFk;
	
	@Column(name="height")
	private String height;
	
	@Column(name="weight")
	private String weight;
	
	@Column(name="bloodpressure")
	private String bloodpressure;
	
	@Column(name="insullin")
	private String insullin;
	
	
	
		
}
	
	