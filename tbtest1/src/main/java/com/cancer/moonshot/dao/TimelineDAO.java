package com.cancer.moonshot.dao;


import java.util.List;

import com.cancer.moonshot.pojo.Timeline;

public interface TimelineDAO {
	
	public List<Timeline> loadTimelineRecords(int id);

}


