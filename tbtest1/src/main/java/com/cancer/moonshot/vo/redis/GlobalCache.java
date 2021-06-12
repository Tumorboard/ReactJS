package com.cancer.moonshot.vo.redis;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class GlobalCache implements Serializable{
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	String sessionId;
	
	private Map<String,Serializable> sessionMap = new HashMap<>();
	
	
}
