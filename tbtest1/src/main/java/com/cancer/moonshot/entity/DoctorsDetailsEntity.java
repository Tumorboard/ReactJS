package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import javax.persistence.Entity;
import lombok.Data;


@Entity
@Data
@Table(name= "doctorslist")
public class DoctorsDetailsEntity implements Serializable{
	
	
	@Id
	@Column(name= "id")
	private int doctorId;
	
	@Column(name="name")
	private String doctorName;
	
	@Column(name="department")
	private String department;
	


	
}
