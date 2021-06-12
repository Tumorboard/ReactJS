package com.cancer.moonshot.bo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cancer.moonshot.dao.CMDao;
import com.cancer.moonshot.dao.ConclusionDAO;
import com.cancer.moonshot.dao.DoctorsDetailsDAO;
import com.cancer.moonshot.dao.PatientDetailsDAO;
import com.cancer.moonshot.dao.TBAllergiesDAO;
import com.cancer.moonshot.dao.TBBiomarkersDAO;
import com.cancer.moonshot.dao.TBCheckConclusionDAO;
import com.cancer.moonshot.dao.TBComorbiditiesDAO;
import com.cancer.moonshot.dao.TBCoordinatorDAO;
import com.cancer.moonshot.dao.TBFamilyMedicalhistoryDAO;
import com.cancer.moonshot.dao.TBMedicationsDAO;
import com.cancer.moonshot.dao.TBMeetingsDAO;
import com.cancer.moonshot.dao.TBNotificationsDAO;
import com.cancer.moonshot.dao.TBNurseNavigatorDAO;
import com.cancer.moonshot.dao.TBPastmedicalhistoryDAO;
import com.cancer.moonshot.dao.TBPatientillnessDAO;
import com.cancer.moonshot.dao.TBPhysicalexaminationDAO;
import com.cancer.moonshot.dao.TBTumorinformationDAO;
import com.cancer.moonshot.dao.TBcancerinfoDAO;
import com.cancer.moonshot.dao.TimelineDAO;
import com.cancer.moonshot.dao.TreatmentHistoryDAO;
import com.cancer.moonshot.entity.AllergiesEntity;
import com.cancer.moonshot.entity.BiomarkersEntity;
import com.cancer.moonshot.entity.CheckConclusionEntity;
import com.cancer.moonshot.entity.ComorbiditiesEntity;
import com.cancer.moonshot.entity.ConclusionEntity;
import com.cancer.moonshot.entity.Coordinator_detailsEntity;
import com.cancer.moonshot.entity.FamilymedicalhistoryEntity;
import com.cancer.moonshot.entity.MedicationsEntity;
import com.cancer.moonshot.entity.NotificationsEntity;
import com.cancer.moonshot.entity.NurseNavigatorEntity;
import com.cancer.moonshot.entity.PastmedicalhistoryEntity;
import com.cancer.moonshot.entity.PatientillnessEntity;
import com.cancer.moonshot.entity.PhysicalexaminationEntity;
import com.cancer.moonshot.entity.TumorBoardDetailsEntity;
import com.cancer.moonshot.entity.TumorinformationEntity;
import com.cancer.moonshot.entity.cancerinfoEntity;
import com.cancer.moonshot.pojo.DoctorsDetails;
import com.cancer.moonshot.pojo.PatientDetails;
import com.cancer.moonshot.pojo.Timeline;
import com.cancer.moonshot.pojo.TreatmentHistory;
import com.cancer.moonshot.pojo.TumorBoardDetails;

@Component
public class CMBusinessObject {
	
	@Autowired
	CMDao cmDao;
	
	@Autowired
	TBMeetingsDAO meetingsDAO;
	
	@Autowired
	DoctorsDetailsDAO docsDetailsDAO;
	
	@Autowired
	PatientDetailsDAO patientDetailsDAO;
	
	@Autowired
	TreatmentHistoryDAO THDAO;
	
	@Autowired
	TimelineDAO timelineDAO;
	
	@Autowired
	ConclusionDAO conclDAO;
	
	
	
	public List<TreatmentHistory> getthrecords(int id) {
		
		List<TreatmentHistory> thRecords = THDAO.loadthRecords(id);
		
		return thRecords;
	}

public List<Timeline> gettimelinerecords(int id) {
		
		List<Timeline> timelineRecords = timelineDAO.loadTimelineRecords(id);
		
		return timelineRecords;
	}
	
	
public List<PatientDetails> getPatientDetails() {
	
	List<PatientDetails> patientDetails = patientDetailsDAO.loadPatientDetails();
	
	return patientDetails;
}

public PatientDetails getPatientDetails(int id) {
	PatientDetails patientDetails = patientDetailsDAO.getPatientDetails(id);

	return patientDetails;
}
	
	
	public List<TumorBoardDetails> getMeetingDetails() {
		
		List<TumorBoardDetails> meetingDetails = meetingsDAO.loadTbMettingDetails();
		
		return meetingDetails;
	}
	
	
	
	public List<TumorBoardDetails> getTodaysMeetingDetails() {
		
		List<TumorBoardDetails> meetingDetails = meetingsDAO.loadTodaysMeetingDetails();
		
		return meetingDetails;
	}	
	
	
	
public List<DoctorsDetails> getDoctorsDetails() {
		
		List<DoctorsDetails> doctorsDetails = docsDetailsDAO.loadDoctorsDetails();
		
		return doctorsDetails;
	}
	
	public TumorBoardDetailsEntity save(TumorBoardDetailsEntity md) throws Throwable {
	
		Throwable exception = null;
		TumorBoardDetailsEntity mdoutput = new TumorBoardDetailsEntity();
		try {
			mdoutput = meetingsDAO.save(md) ;
		}
		 catch(Throwable e) {
	 			exception = e;
	 			System.out.println(e.toString()) ;
	 		}
		
		return mdoutput ;

}
	
	
	public void addConclusion(ConclusionEntity concl) throws Throwable {
		
		Throwable exception = null;
		TumorBoardDetailsEntity mdoutput = new TumorBoardDetailsEntity();
		try {
			conclDAO.save(concl) ;
		}
		 catch(Throwable e) {
	 			exception = e;
	 			System.out.println(e.toString()) ;
	 		}
		
		return ;

}
	
	@Autowired
	TBCoordinatorDAO meetingsDAO1;
	
	public List<Coordinator_detailsEntity> getCoordinator_details() {
		
		List<Coordinator_detailsEntity> coordinator_details = meetingsDAO1.loadTbCoordinator_details();
		
		return coordinator_details;
	}
	
	@Autowired
	TBNotificationsDAO notificationsDAO;
	
	public List<NotificationsEntity> getNotifications() {
		
		List<NotificationsEntity> doctorsdetails = notificationsDAO.loadTbNotifications();
		
		return doctorsdetails;
	}
	@Autowired
	TBFamilyMedicalhistoryDAO familymedicalhistoryDAO;
	
	public List<FamilymedicalhistoryEntity> getfamilymedicalhistory(int id) {
		
		List<FamilymedicalhistoryEntity> summarydetails = familymedicalhistoryDAO.loadTbFamilymedicalhistoryDetails(id);
		
		return summarydetails;
	}
	
	@Autowired
	TBBiomarkersDAO biomarkersDAO;
	
	public List<BiomarkersEntity> getbiomarkers(int id) {
		
		List<BiomarkersEntity> summarydetails = biomarkersDAO.loadTbBiomarkersDetails(id);
		
		return summarydetails;
	}
	
	@Autowired
	TBcancerinfoDAO cancerinfoDAO;
	
	public List<cancerinfoEntity> getcancerinfo(int id) {
		
		List<cancerinfoEntity> summarydetails = cancerinfoDAO.loadTbCancerinfoDetails(id);
		
		return summarydetails;
	}
	
	@Autowired
	TBPatientillnessDAO PatientillnessDAO;
	
	public List<PatientillnessEntity> getpatientillness(int id) {
		
		List<PatientillnessEntity> summarydetails = PatientillnessDAO.loadTbPatientillnessDetails(id);
		
		return summarydetails;
	}
	
	@Autowired
	TBPhysicalexaminationDAO PhysicalexaminationDAO;
	
	public List<PhysicalexaminationEntity> getphysicalexamination(int id) {
		
		List<PhysicalexaminationEntity> summarydetails = PhysicalexaminationDAO.loadTbPhysicalexaminationDetails(id);
		
		return summarydetails;
	}
	
	@Autowired
	TBTumorinformationDAO TumorinformationDAO;
	
	public List<TumorinformationEntity> gettumorinformation(int id) {
		
		List<TumorinformationEntity> summarydetails = TumorinformationDAO.loadTbTumorinformationDetails(id);
		
		return summarydetails;
	}
	@Autowired
	TBMedicationsDAO MedicationsDAO;
	
	public List<MedicationsEntity> getmedications(int id) {
		
		List<MedicationsEntity> summarydetails = MedicationsDAO.loadTbMedicationsDetails(id);
		
		return summarydetails;
	}
	
	@Autowired
	TBPastmedicalhistoryDAO PastmedicalhistoryDAO;
	
	public List<PastmedicalhistoryEntity> getpastmedicalhistory(int id) {
		
		List<PastmedicalhistoryEntity> summarydetails = PastmedicalhistoryDAO.loadTbPastmedicalhistoryDetails(id);
		
		return summarydetails;
	}
	@Autowired
	TBComorbiditiesDAO ComorbiditiesDAO;
	
	public List<ComorbiditiesEntity> getcomorbidities(int id) {
		
		List<ComorbiditiesEntity> summarydetails = ComorbiditiesDAO.loadTbComorbiditiesDetails(id);
		
		return summarydetails;
	}
	@Autowired
	TBAllergiesDAO AllergiesDAO;
	
	public List<AllergiesEntity> getallergies(int id) {
		
		List<AllergiesEntity> summarydetails = AllergiesDAO.loadTbAllergiesDetails(id);
		
		return summarydetails;
	}
/*	@Autowired
	TBPatientdetailsDAO PatientdetailsDAO;
	
	public List<PatientdetailsEntitySum> getpatientdetails(int id) {
		
		List<PatientdetailsEntitySum> summarydetails = PatientdetailsDAO.loadTbPatientDetails(id);
		
		return summarydetails;
	} */
	
	@Autowired
	TBNurseNavigatorDAO NursenavigatorDAO;
	
	public List<NurseNavigatorEntity> getNursenavigator() {
		
		List<NurseNavigatorEntity> summarydetails = NursenavigatorDAO.loadTbNurseNavigator();
		
		return summarydetails;
	}
	
	public String delete(List<TumorBoardDetails> a) {
		// TODO Auto-generated method stub
		return "hello";
	}
	
//	public void deleteTBRecord(int tbid) throws Throwable {
//		
//		Throwable exception = null;
//		//TumorBoardDetailsEntity mdoutput = new TumorBoardDetailsEntity();
//		try {
//			
//			  meetingsDAO.deleteTBRecord(tbid);
//		}
//		 catch(Throwable e) {
//	 			exception = e;
//	 			System.out.println(e.toString()) ;
//	 		}
//		
//		return ;
//
//	}
	
	@Autowired
	TBCheckConclusionDAO CheckConclusionDAO;
	
	public List<CheckConclusionEntity> getCheckconclusion(int id) {
		
		List<CheckConclusionEntity> tumorboarddetails = CheckConclusionDAO.loadCheckConclusionDetails(id);
		
		return tumorboarddetails;
	}
	
public TumorBoardDetails getTumorboardDetails(int tbid) {
		
		TumorBoardDetails tumorboardDetails = meetingsDAO.loadTumorboardDetails(tbid);
		
		return tumorboardDetails;
	}
		
		
}
