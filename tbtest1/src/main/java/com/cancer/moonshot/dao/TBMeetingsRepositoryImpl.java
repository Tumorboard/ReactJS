package com.cancer.moonshot.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.entity.TumorBoardDetailsEntity;
import com.cancer.moonshot.pojo.TumorBoardDetails;
import com.cancer.moonshot.repository.TBMettingsRepository;
import com.google.gson.Gson;

@Component
public class TBMeetingsRepositoryImpl implements TBMeetingsDAO {
	
	@Autowired
	TBMettingsRepository meetingsRepo;
	
	@Autowired
	Gson gson;
	
	
	public List<TumorBoardDetails> loadTbMettingDetails(){
		List<TumorBoardDetails> tbDetails = meetingsRepo.getTBRecords();
System.out.println("outputXXXXXXXx: "+tbDetails) ;

		//List<TumorBoardDetailsEntity> tbDetails = new ArrayList<>();
		
		/*meetingDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),MeetingDetails.class));
			
		});*/
		
		return tbDetails;
	}
	
	
	
	
	public List<TumorBoardDetails> loadTodaysMeetingDetails(){
		List<TumorBoardDetails> tbDetails = meetingsRepo.getTodaysTBRecords();
System.out.println("outputXXXXXXXx: "+tbDetails) ;

		//List<TumorBoardDetailsEntity> tbDetails = new ArrayList<>();
		
		/*meetingDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),MeetingDetails.class));
			
		});*/
		
		return tbDetails;
	}
	
	@Override
     public TumorBoardDetailsEntity save(TumorBoardDetailsEntity md) throws Throwable  {
         // TODO Auto-generated method stub
    	 Throwable exception = null;
    	 try {
    	 }
    	 catch(Throwable e) {
 			exception = e;
 			System.out.println(e.toString()) ;
 		}
    	 meetingsRepo.save(md);
         return md ;
     }
	
	public TumorBoardDetails loadTumorboardDetails(int tbid){
		TumorBoardDetails tbDetails = meetingsRepo.getTumorboardDetails(tbid);
System.out.println("outputXXXXXXXx: "+tbDetails) ;

		//List<TumorBoardDetailsEntity> tbDetails = new ArrayList<>();
		
		/*meetingDetails.stream().forEach(tumorBoardDetails ->{
			//if needed we can do operations here and type cast details to final pojo 
			tbDetails.add(gson.fromJson(gson.toJson(tumorBoardDetails),MeetingDetails.class));
			
		});*/
		
		return tbDetails;
	}
	
//	 @Override public void  deleteTBRecord(int tbid)throws Throwable { 
//		  // TODO Auto-generated method stub 
//		  Throwable exception =null; 
//		  try {
//			  
//		  } catch(Throwable e)
//		  { 
//			  exception = e;
//	  System.out.println(e.toString()) ;
//	  } 
//		  meetingsRepo.deleteTBRecord(tbid);;
//		  return ;
//		  }
	

}
