package com.cancer.moonshot.common;

import java.util.Collections;
import java.util.Set;
import java.util.WeakHashMap;

public interface Reloadable {
	
	public interface Observer {
		void update(Reloadable o, Object... args);
	}
	
	void invalidateCache();
	//default implementation for observable
	class Extensions {
		private static final WeakHashMap<Reloadable, Set<Observer>> observers = new WeakHashMap<>();
	}
	
	//getting all observers from redis cache
	
	default Set<Observer> getObservers(){
		synchronized (Extensions.observers) {
			Set<Observer> observers = Extensions.observers.get(this);
			if(observers!=null) {
				return Collections.unmodifiableSet(observers);
			}else {
				return Collections.emptySet();
			}
		}
	}

}
