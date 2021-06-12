package com.cancer.moonshot.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table (name = "meetingdetails" , schema ="")
public class NotificationsEntity implements Serializable{

	@Id
	@Column(name = "")
	private int tbid;
	
	@Column()
	private String date;
	private String tbtype;
	private int casescount;
	
}
