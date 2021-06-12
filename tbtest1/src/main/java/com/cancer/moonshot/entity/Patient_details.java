package com.cancer.moonshot.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="patient_details")
public class Patient_details {
	
	@Id
	@Column(name="id")
	private int patientId;
	
	@Column(name="name")
	private String patientName;
	
	@Column(name="age")
	private int patientAge;
	
	@Column(name="gender")
	private String patientGender;
	
	@Column(name="patienttype")
	private String patientPatienttype;
	
	@Column(name="relation")
	private String patientRelation;
	
	@Column(name="cancertype")
	private String patientCancertype;
	
	@Column(name="problem")
	private String patientProblem;
	
	@Column(name="timevisitcreated")
	//private double patientTimevisitcreated;
	private Timestamp patientTimevisitcreated;
	
	@Column(name="caretype")
	private String patientCaretype;
	
	@Column(name="consultationtype")
	private String patientConsultationtype;
	

}
