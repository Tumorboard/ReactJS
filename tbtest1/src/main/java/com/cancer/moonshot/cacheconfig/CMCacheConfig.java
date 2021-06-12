package com.cancer.moonshot.cacheconfig;

import java.io.Serializable;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.cancer.moonshot.common.Reloadable;
import com.cancer.moonshot.vo.cache.CMSession;
import com.fasterxml.jackson.databind.ObjectMapper;

//@Configuration
//@EnableCaching
public class CMCacheConfig implements Reloadable,DisposableBean{
	
	@Value("#{'${redis.nodes}'.split(',')}")
	private List<String> nodes;
	
	@Value("${redis.password}")
	private String password;
	
	@Value("${redis.connectionTimeout}")
	private long connectionTimeout;
	
	@Value("${redis.maxIdle}")
	private int maxIdle;
	
	@Value("${redis.maxActive}")
	private int maxActive;

	@Override
	public void destroy() throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	public enum CacheProvide{
		none,ehcache,redis
	}
	private final static long TIME_MEDIAN = 900L; 
	
	public Map<String,Long> expiryConfig(){
		HashMap<String,Long> expiryConfig = new HashMap<>();
		expiryConfig.put("CACHE_USER_SESSION", TIME_MEDIAN);
		
		return expiryConfig;
 	}

	
	
	
	@Override
	public void invalidateCache() {
		//need to write reloading the cache
	//	reloadCacheManager();
		for(Observer o:getObservers()) {
			o.update(this);
		}
		
	}
	
	@Bean("cmCache")
	@Scope(value= "thread",proxyMode= ScopedProxyMode.TARGET_CLASS)
	public CMSession getCMSession() {
		return new CMSession();
	}
	
	@Bean
	@Lazy
	public RedisConnectionFactory lettuceConnectionFactory(GenericObjectPoolConfig config) {
		
		try {
			RedisClusterConfiguration clusterConfig = new RedisClusterConfiguration(nodes);
			clusterConfig.setPassword(password);
			LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder().commandTimeout(Duration.ofMillis(connectionTimeout)).useSsl().build();
			return new LettuceConnectionFactory(clusterConfig,clientConfig);
		}catch(Exception e) {
			return new LettuceConnectionFactory();
		}
		
	}
	
	public RedisTemplate<String,Object> redisTemplate(){
		final RedisTemplate<String, Object> template = new RedisTemplate<String,Object>();
		// for now setting pool size null
		template.setConnectionFactory(lettuceConnectionFactory(null));
		template.setKeySerializer(new StringRedisSerializer());
		template.setValueSerializer(new JdkSerializationRedisSerializer());
		return template;
		
	}
	
	public Map<String,RedisCacheConfiguration> getInitialCacheConfig(Map<String,Long> cacheConfig){
		Map<String,RedisCacheConfiguration> initialCacheConfig = new HashMap<String,RedisCacheConfiguration>();
		RedisCacheConfiguration redisCacheConfig = null;
			for(String key : expiryConfig().keySet()) {
				if("CACHE_USER_SESSION".equals(key)) {
					redisCacheConfig = RedisCacheConfiguration.defaultCacheConfig().
							prefixKeysWith(String.format(String.format("%s.", key)))
							.entryTtl(Duration.ofSeconds(expiryConfig().get(key)))
							.serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
							.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(getSerializableClass()));
				}
				initialCacheConfig.put(key, redisCacheConfig);
			}
		
		return initialCacheConfig;
		
	}

	private Jackson2JsonRedisSerializer getSerializableClass() {
		Jackson2JsonRedisSerializer valueSerializer = new Jackson2JsonRedisSerializer<>(Serializable.class);
		valueSerializer.setObjectMapper(new ObjectMapper().findAndRegisterModules());
		return valueSerializer;
	}
	
	public RedisCacheManager getRedisCacheManager() {
		RedisCacheManager cacheManager = new RedisCacheManager(getRedisCacheWriter(), 
				RedisCacheConfiguration.defaultCacheConfig(),getInitialCacheConfig(expiryConfig()));
		cacheManager.setTransactionAware(true);
		return cacheManager;
	}
	
	@Bean
	@Lazy
	public RedisCacheWriter getRedisCacheWriter() {
		
		return RedisCacheWriter.nonLockingRedisCacheWriter(lettuceConnectionFactory(null));
		
		
	}

}
