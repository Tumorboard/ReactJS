package com.cancer.moonshot.pojo;

import lombok.Data;

//@Table(name="coordinator_details")
@Data
public class Coordinator_details {
	
	//@Id
	//@Column(name="")
	private int id;
	
	//@Column(name="name")
	private String name;
	
	//@Column(name="experience")
	private int experience;
	
	//@Column(name="gender")
	private String gender;
	
	//@Column(name="mobile")
	private int mobile;
	
	//@Column(name="education")
	private String education;
	
	//@Column(name="location")
	private String location;
	
	//@Column(name="languages")
	private String languages;
	
	//@Column(name="profile_pic")
	private String profile_pic;
	
}