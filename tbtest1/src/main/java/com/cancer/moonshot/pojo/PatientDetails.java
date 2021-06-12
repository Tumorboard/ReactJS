package com.cancer.moonshot.pojo;

import lombok.Data;

@Data
public class PatientDetails {
	
private int id;
	
	
	private String name;
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private int  age ;
	private String gender;
	private String location ;
	private String hospital ;
	private String patienttype;
	
	private String relation;
	private String owning_doctor ;
	private String cancertype;
	private String problem;
	private String timevisitcreated;
	private String caretype;
	
	private String consultationtype;

	public PatientDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "PatientDetails [id=" + id + ", name=" + name + ", age=" + age + ", gender=" + gender + ", patienttype="
				+ patienttype + ", relation=" + relation + ", cancertype=" + cancertype + ", problem=" + problem
				+ ", timevisitcreated=" + timevisitcreated + ", caretype=" + caretype + ", consultationtype="
				+ consultationtype + "]";
	}
	
	

}
