package com.cancer.moonshot.pojo;


import lombok.Data;

@Data

public class DoctorsDetails {
	
private int doctorId;
	

	private String doctorName;
	
	
	private String department;


	public int getDoctorId() {
		return doctorId;
	}


	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}


	public String getDoctorName() {
		return doctorName;
	}


	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}


	public String getDepartment() {
		return department;
	}


	public void setDepartment(String department) {
		this.department = department;
	}
	

}
