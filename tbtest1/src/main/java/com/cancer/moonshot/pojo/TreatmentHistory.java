package com.cancer.moonshot.pojo;

import lombok.Data;

@Data
public class TreatmentHistory {


	private int id;
	private int patientid ;
	private String date;
	private String therapeutics;
	private String description;
	private String responsible;
	
	public String getTherapeutics() {
		return therapeutics;
	}

	public void setTherapeutics(String therapeutics) {
		this.therapeutics = therapeutics;
	}

	@Override
	public String toString() {
		return "TreatmentHistory [id=" + id + ", patientIdFk=" + patientid + ", date=" + date + ", therapeutics="
				+ therapeutics + ", description=" + description + ", responsible=" + responsible + "]";
	}


	}

