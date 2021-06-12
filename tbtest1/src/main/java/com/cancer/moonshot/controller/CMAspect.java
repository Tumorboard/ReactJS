package com.cancer.moonshot.controller;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CMAspect {
	private static final Logger logger = LoggerFactory.getLogger(CMAspect.class);
	
	
//	@Around("(execution(public * com.cancer.moonshot.CMController.*(..)) && args(request, ..))")
	public Object onControllerRequest(ProceedingJoinPoint joinPoint,Object request) throws Throwable {
		Object finalResult = null;
		Throwable exception = null;
		//session creation
		//redis if already session available 
		//same session uage
		try {
			finalResult = joinPoint.proceed(joinPoint.getArgs());
		}catch(Throwable e) {
			exception = e;
		}
		
		if(exception!=null) {
			throw exception;
		}else {
			return finalResult;
		}
		//aving to redis
		
	}
	
}
