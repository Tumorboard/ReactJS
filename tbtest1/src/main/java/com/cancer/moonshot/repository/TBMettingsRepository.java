package com.cancer.moonshot.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.TumorBoardDetailsEntity;
import com.cancer.moonshot.pojo.TumorBoardDetails;



@Repository
public interface TBMettingsRepository extends JpaRepository<TumorBoardDetailsEntity, Integer>{
	
	public static final EntityManager entityManager = null;

	//TumorBoardDetailsEntity save(TumorBoardDetailsEntity md);
	
//List<TumorBoardDetailsEntity> getTumorBoardRecords() ;
	
/*	int tbid, String name, String purpose, String start_time, int duration, String mode,
	String location, String video_link, String status, String priority, int frequency_in_days, String notes,
	int patientIdFk, String presenting_doc, String attending_doc, String patientname, String doctorName */
	
	@Query("select new com.cancer.moonshot.pojo.TumorBoardDetails(t.id as tbid "
			+"	,t.name,t.purpose,t.start_time,t.duration,t.mode,t.location,t.video_link,t.status,t.priority,"
			+ "t.frequency_in_days,t.notes,t.inserted_time,t.patientIdFk,t.presenting_doc,t.attending_doc,p.name as patientname,d.doctorName as doctorName) "
	        + "from TumorBoardDetailsEntity t "
	        + "left join PatientDetailsEntity p "
	        + "on t.patientIdFk = p.id  "
	        + "left join DoctorsDetailsEntity d on t.presenting_doc = d.doctorId Order by t.start_time")
		
		List<TumorBoardDetails>  getTBRecords();
		
		
	
	
	@Query("select new com.cancer.moonshot.pojo.TumorBoardDetails(t.id as tbid "
			+"	,t.name,t.purpose,t.start_time,t.duration,t.mode,t.location,t.video_link,t.status,t.priority,"
			+ "t.frequency_in_days,t.notes,t.inserted_time,t.patientIdFk,t.presenting_doc,t.attending_doc,p.name as patientname,d.doctorName as doctorName) "
	        + "from TumorBoardDetailsEntity t "
	        + "left join PatientDetailsEntity p "
	        + "on t.patientIdFk = p.id  "
	        + "left join DoctorsDetailsEntity d on t.presenting_doc = d.doctorId  where date(t.start_time)=curdate() Order by t.start_time")
		
		List<TumorBoardDetails>  getTodaysTBRecords();



	@Query("select new com.cancer.moonshot.pojo.TumorBoardDetails(t.id as tbid "
			+"	,t.name,t.purpose,t.start_time,t.duration,t.mode,t.location,t.video_link,t.status,t.priority,"
			+ "t.frequency_in_days,t.notes,t.inserted_time,t.patientIdFk,t.presenting_doc,t.attending_doc,p.name as patientname,d.doctorName as doctorName) "
	        + "from TumorBoardDetailsEntity t "
	        + "left join PatientDetailsEntity p "
	        + "on t.patientIdFk = p.id  "
	        + "left join DoctorsDetailsEntity d on t.presenting_doc = d.doctorId  where t.id = ?1")
		
		TumorBoardDetails  getTumorboardDetails(int tbid);
	
	
	/*,t.name,t.purpose,t.start_time,"
        + "t.duration,t.mode,t.location,t.video_link,t.status,t.priority,t.frequency_in_days,"
        + "t.notes,t.patientIdFk,t.presenting_doc,t.attending_doc,p.name as patientname,d.doctorName as docname "*/
	//  + "left join DoctorsDetailsEntity d on t.presenting_doc = d.doctorId "
			
//	@Transactional
//	@Modifying(clearAutomatically = true)
//	@Query("update TumorBoardDetailsEntity u set u.status ='DELETED' where u.id=?1")
//	
//		  void deleteTBRecord(int id);



	//Optional<TumorBoardDetailsEntity> findBypatientIdFk(int tbid);


	
	

}
