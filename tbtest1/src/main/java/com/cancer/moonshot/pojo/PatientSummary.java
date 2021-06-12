package com.cancer.moonshot.pojo;

import lombok.Data;

@Data
public class PatientSummary {
	
	String healthscreening;
	String gender;
	String city;
	String name;
	String hospital;
	int age;
	String healthinfo;
	String familymedinfo;
	String biomarkersType;
	String biomarkersResult;
	int biomarkersValue;
	double biomarkersUnit;
	String physicalExamination;
	String coMorbidities;
	int tumorinfoSize;
	String tumorinfoMargins;
	String tumorinfolymphnodes;
	String pastmedicalhistory;
	String medicationdrugs;
	String cancerinfoorgan;
	String cancerinfostage;
	String cancerinfotype;
	

}

