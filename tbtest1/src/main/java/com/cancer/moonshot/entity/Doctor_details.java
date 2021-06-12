package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="doctor_details")
public class Doctor_details {

	@Id
	@Column(name="id")
	private int doctorId;
	
	@Column(name="name")
	private String doctorName;
	
	@Column(name="age")
	private int doctorAge;
	
	@Column(name="experience")
	private int doctorExperience;
	
	@Column(name="specialization")
	private String doctorSpecialization;
	
	@Column(name="organ_types")
	private String doctorOrgan_types;
	
	@Column(name="education")
	private String doctorEducation;
	
	@Column(name="location")
	private String doctorLocation;
	
	@Column(name="hospitals_working")
	private String doctorHospitals_working;
	
	@Column(name="position")
	private String doctorPosition;
	
	@Column(name="languages")
	private String doctorLanguages;
	
	@Column(name="facebook")
	private String doctorFacebook;
	
	@Column(name="linkedin")
	private String doctorLinkedin;
	
	@Column(name="twitter")
	private String doctorTwitter;
	
	@Column(name="website")
	private String doctorWebsite;
	
	@Column(name="awards_recongnitions")
	private String doctorAwards_recongnitions;
	
	@Column(name="patient_testimonial")
	private String doctorPatient_testimonial;
	
	@Column(name="youtube")
	private String doctorYoutube;
	
	@Column(name="profile_pic")
	private String doctorProfile_pic;
	
}