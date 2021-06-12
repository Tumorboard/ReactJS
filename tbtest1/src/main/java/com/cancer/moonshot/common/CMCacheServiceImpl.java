package com.cancer.moonshot.common;

import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.vo.redis.GlobalCache;

@Component
public class CMCacheServiceImpl implements CMCacheService{

	@Override
	@Cacheable(cacheNames = "CACHE_USER_SESSION" , key ="#sessionId")
	public GlobalCache readFromGlobalCache(String sessionId) {
		GlobalCache globalCache = new GlobalCache();
		//globalCache.setSessionId(sessionId);
		return globalCache;
	}

	@Override
	@CachePut(cacheNames = "CACHE_USER_SESSION" , key = "#globalCache.sessionId")
	public GlobalCache saveToGlobalCache(GlobalCache globalCache) {

		return globalCache;
	}

}
