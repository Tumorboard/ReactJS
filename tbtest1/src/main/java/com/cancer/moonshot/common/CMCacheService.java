package com.cancer.moonshot.common;

import com.cancer.moonshot.vo.redis.GlobalCache;

public interface CMCacheService {
	
	public GlobalCache readFromGlobalCache(String sessionId);
	
	public GlobalCache saveToGlobalCache(GlobalCache globalCache);

}
