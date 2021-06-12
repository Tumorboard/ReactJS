package com.cancer.moonshot.vo.cache;

import java.io.Serializable;

import org.springframework.stereotype.Component;

@Component
public interface GlobalSession {

	public <T extends Serializable> T setGlobal(String sessionkey,Serializable sessionValue);
	
	public <T> T popGlobal(String sessionkey);

	public <T> T getGlobal(String sessionkey);
	
	public <T> T getOrDefaultGlobal(String sessionkey,T defaultValue);
	
}
