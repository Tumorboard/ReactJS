package com.cancer.moonshot.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table (name = "timeline" , schema ="")
public class TimelineEntity implements Serializable{

	@Id
	@Column(name = "id")
	private int id;
	
	@Column(name = "patientIdFk ")
	private int patientid ;
	private String item;
	private String date;
	private String link;
	@Override
	public String toString() {
		return "TimelineEntity [id=" + id + ", patientid=" + patientid + ", item=" + item + ", date=" + date + ", link="
				+ link + "]";
	}
	
	
	
}


