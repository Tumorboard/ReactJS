package com.cancer.moonshot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="coordinator_details",schema ="")
public class Coordinator_detailsEntity {
	
	@Id
	@Column(name="")
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="experience")
	private int experience;
	
	@Column(name="gender")
	private String gender;
	
	@Column(name="mobile")
	private int mobile;
	
	@Column(name="education")
	private String education;
	
	@Column(name="location")
	private String location;
	
	@Column(name="languages")
	private String languages;
	
	@Column(name="profile_pic")
	private String profile_pic;
	
}