package com.cancer.moonshot.vo.cache;

import com.cancer.moonshot.vo.redis.GlobalCache;

import lombok.Data;

@Data
@SuppressWarnings("unchecked")
public class CMSession  {

	
	  private GlobalCache globalCache = new GlobalCache();
	  
	 /* @Override public <T extends Serializable> T setGlobal(String sessionkey,
	 * Serializable sessionValue) { globalCache.getSessionMap().put(sessionkey,
	 * sessionValue); return (T) globalCache.getSessionMap().put(sessionkey,
	 * sessionValue); }
	 * 
	 * @Override public <T> T popGlobal(String sessionkey) { T value = (T)
	 * globalCache.getSessionMap().get(sessionkey);
	 * globalCache.getSessionMap().remove(sessionkey); return value; }
	 * 
	 * @Override public <T> T getGlobal(String sessionkey) { return (T)
	 * globalCache.getSessionMap().get(sessionkey); }
	 * 
	 * @Override public <T> T getOrDefaultGlobal(String sessionkey, T defaultValue)
	 * { T value = (T) globalCache.getSessionMap().get(sessionkey); if(value!=null)
	 * { return value; } else { return defaultValue; } }
	 */

}
