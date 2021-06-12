package com.cancer.moonshot.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table (name = "treatmenthistory" , schema ="")
public class TreatmentHistoryEntity implements Serializable{

	@Id
	@Column(name = "id")
	private int id;
	
	@Column(name = "patientIdFk ")
	private int patientid ;
	private String date;
	private String therapeutics;
	private String description;
	private String responsible;
	@Override
	public String toString() {
		return "TreatmentHistoryEntity [id=" + id + ", date=" + date + ", therapeutics=" + therapeutics
				+ ", description=" + description + ", responsible=" + responsible + "]";
	}
	
}

