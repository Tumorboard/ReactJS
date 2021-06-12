package com.cancer.moonshot.pojo;

import lombok.Data;

@Data
public class Timeline {
	private int id ;
	private int patientId;
	private String item;
	private String date;
	private String link;

}

