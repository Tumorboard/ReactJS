package com.cancer.moonshot.pojo;

import lombok.Data;

@Data
public class PatientTreatmentHistory {
	private int patientId;
	private String date;
	private String description;
	private String therapeutics;
	private String responsible;

}
