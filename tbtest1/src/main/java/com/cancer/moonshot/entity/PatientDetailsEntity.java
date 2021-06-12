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
@Table (name = "patient_details" , schema ="")
public class PatientDetailsEntity implements Serializable{

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column()
	private String name;
	private int  age ;
	
	
	private String gender;
	private String location ;
	private String hospital ;
	private String patienttype;
	
	private String relation;
	
	private String cancertype;
	private String problem;
	private String timevisitcreated;
	private String caretype;
	
	private String consultationtype;
	private String owning_doctor;
}

/*@Table(name="patient_details")
public class PatientDetailsEntity {
	
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
	

} */
