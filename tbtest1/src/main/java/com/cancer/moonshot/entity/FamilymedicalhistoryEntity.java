package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name= "familymedicalhistory",schema ="")
public class FamilymedicalhistoryEntity {
	
	
	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="patient_id_fk")
	private int patientIdFk;
	
	@Column(name="grandparents")
	private String grandparents;
	
	@Column(name="parents")
	private String parents;
	
	@Column(name="others")
	private String others;
	
	
}
	
	