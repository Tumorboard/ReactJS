package com.cancer.moonshot.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="user_details")
public class User_details {
	
	@Id
	@Column(name="id")
	private int userId;
	
	@Column(name="name")
	private String userName;
	
	@Column(name="email")
	private String userEmail;
	
	@Column(name="password")
	private String userPassword;
	
	@Column(name="country")
	private String userCountry;
	
	@Column(name="state")
	private String userState;
	
	@Column(name="mobile")
	private int userMobile;
	
	@Column(name="gender")
	private String userGender;
	
	@Column(name="verifycode")
	private int userVerifycode;
	
	@Column(name="accountstatus")
	private int userAccountstatus;
	
	@Column(name="timeaccountcreated")
	private Timestamp userTimeaccountcreated;
	
	@Column(name="role")
	private String userRole;
	
	@Column(name="usertoken")
	private String userUsertoken;
	
	@Column(name="mailstatus")
	private int userMailstatuss;
	

}
