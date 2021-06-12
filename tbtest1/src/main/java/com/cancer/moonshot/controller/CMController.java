package com.cancer.moonshot.controller;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cancer.moonshot.bo.CMBusinessObject;
import com.cancer.moonshot.entity.ConclusionEntity;
import com.cancer.moonshot.entity.TumorBoardDetailsEntity;
import com.cancer.moonshot.pojo.DoctorsDetails;
import com.cancer.moonshot.pojo.MeetingDetails;
import com.cancer.moonshot.pojo.PatientDetails;
import com.cancer.moonshot.pojo.PatientDetailsKeyValue;
import com.cancer.moonshot.repository.TBMettingsRepository;
import com.google.gson.Gson;

@CrossOrigin(origins = "*")
@RestController
public class CMController {

	@Autowired
	CMBusinessObject cmBO;
	
	TBMettingsRepository meetingsRepo;	
		MeetingDetails md ;
		
		@Autowired
		TBMettingsRepository tbmr;
	
		@CrossOrigin("*")
		@RequestMapping(value = "/getMeetingDetails", method = RequestMethod.GET)
		public String getMettingDetails() {
			Gson gson = new Gson();
			System.out.println(gson.toJson(cmBO.getMeetingDetails()));
			return gson.toJson(cmBO.getMeetingDetails());
		}
		
//		@RequestMapping(value="/delete",method = RequestMethod.GET)
//		public boolean  deleteTBRecord( int tbid) {
//			System.out.println("helllo");
//			try {
//			 cmBO.deleteTBRecord(tbid);
//			} catch (Throwable e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			return true;
//		}
		@CrossOrigin("*")
		@PutMapping(value="/update/{tbid}")
		public ResponseEntity<TumorBoardDetailsEntity>  update(@PathVariable("tbid")int tbid, @RequestBody TumorBoardDetailsEntity tbd) throws Throwable  {
			Optional<TumorBoardDetailsEntity> data = tbmr.findById(tbid);
			if(tbd.isPresent()) {
				TumorBoardDetailsEntity tb = data.get();
				tb.setDuration(tbd.getDuration());
				tb.setPresenting_doc(tbd.getPresenting_doc());
				tb.setRequested_time(tbd.getRequested_time());
				tb.setStatus(tbd.getStatus());
				tb.setLocation(tbd.getLocation());
				tb.setStart_time(tbd.getStart_time());
				tb.setName(tbd.getName());
				tb.setPurpose(tbd.getPurpose());
				tb.setPriority(tbd.getPriority());
				tb.setMode(tbd.getMode());
				tb.setVideo_link(tbd.getVideo_link());
				tb.setAttending_doc(tbd.getAttending_doc());
				tb.setFrequency_in_days(tbd.getFrequency_in_days());
				//System.out.printf("hello",tbmr.save(tb));
				return new ResponseEntity<>(tbmr.save(tb),HttpStatus.OK);
				
			}
			else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}			
			//return cmBO.save(tbd);
			
		}
	
		@CrossOrigin("*")
	    @RequestMapping(value = "/getDoctorsDetailsByPatientId", method = RequestMethod.GET)
	    public String getDoctorsDetailsByPatientId(int patientId) {
	    	
	    	String attendingDocsName = "" ;
	    	List<DoctorsDetails> docdets = cmBO.getDoctorsDetails() ;
	        String attendingDocsId  = cmBO.getTumorboardDetails(patientId).getAttending_doc() ;
	        String[] myArray = attendingDocsId.split(",");
	        List <String> myList = Arrays.asList(myArray);
	        
	        for(String listitem:myList)  {
	        	if(!listitem.equals("")) {
	        	for(DoctorsDetails doc:docdets) {
	        		System.out.println();
	        	if(Integer.parseInt(listitem) == doc.getDoctorId()) {
	        		attendingDocsName = attendingDocsName + ","+doc.getDoctorName() ;
	        	}
	        }
	        	}
	        }
	        return attendingDocsName ;
	    }
	
	@RequestMapping(value = "/getCoordinator_details", method = RequestMethod.GET)
	public String getCoordinator_details() {
		Gson gson = new Gson();
		String jsonCartList = gson.toJson(cmBO.getCoordinator_details());
		System.out.println("jsonCartList: " + jsonCartList);
		return jsonCartList;
	}

	@PostMapping(value="/addConclusion")
    public void addConclusion(@Valid @RequestBody String str) throws Throwable {
		 System.out.println("Here in addConclusion") ;
		 System.out.println("Str: "+str) ;
		
		 Gson g = new Gson(); 
		
		 ConclusionEntity concl = g.fromJson(str, ConclusionEntity.class) ;
		
		 System.out.println("beforestarttime: "+concl.getDate_time());
		 String abc = concl.getDate_time() ;
		
		 SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		
		 java.util.Date date = inputFormat.parse(abc);
	
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTime(date);
		 calendar.add(Calendar.MINUTE, 330);
		
		 java.util.Date dt = calendar.getTime();
		 DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		 String strDate = dateFormat.format(dt);
		 
		 System.out.println("Wanted time: "+strDate); 
		 
		concl.setDate_time(strDate) ;
		
		
        cmBO.addConclusion(concl);
        return ;
    } 

	@PostMapping(value="/trial")
    public TumorBoardDetailsEntity trial(@Valid @RequestBody String str) throws Throwable {
		 System.out.println("Here in Create TumorBoard method") ;
		 System.out.println("Str: "+str) ;
		 Gson g = new Gson(); 
		
		 TumorBoardDetailsEntity md = g.fromJson(str, TumorBoardDetailsEntity.class) ;
		
		 System.out.println("beforestarttime: "+md.getStart_time());
		 String abc = md.getStart_time() ;
		
		 SimpleDateFormat inputFormat = new SimpleDateFormat("dd-MM-yyyy'T'HH:mm:ss.SSS'Z'");
		
		 java.util.Date date = inputFormat.parse(abc);
	
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTime(date);
		 calendar.add(Calendar.MINUTE, 330);
		
		 java.util.Date dt = calendar.getTime();
		 DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		 String strDate = dateFormat.format(dt);
		 
		 System.out.println("Wanted time: "+strDate); 
		 
		md.setStart_time(strDate) ;
		md.setRequested_time(strDate) ;
		
        return cmBO.save(md);
    } 

	@CrossOrigin("*")
	@RequestMapping(value = "/getPatientDetails", method = RequestMethod.GET)
	public String getPatientDetails() {
		Gson gson = new Gson();
		return gson.toJson(cmBO.getPatientDetails());
	}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/getTodaysMeetingDetails", method = RequestMethod.GET)
	public String getTodaysMeetingDetails() {
	      Gson gson = new Gson();
	     
	     // System.out.println(gson.toJson(cmBO.getMeetingDetails()));
		return gson.toJson(cmBO.getTodaysMeetingDetails()) ;
	}
	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/getPatientDetailsKeyValue", method = RequestMethod.GET)
	public String getPatientDetailsKeyValue() {     
	      Gson gson = new Gson();
	      List<PatientDetailsKeyValue> pdkv = new ArrayList<>();
	      List<PatientDetails> pdlist = cmBO.getPatientDetails() ;
	      pdlist.stream().forEach(pd ->{
				pdkv.add(new PatientDetailsKeyValue(pd.getId(),pd.getId()));
				});
		return gson.toJson(pdkv) ;
	}
	
	
		@CrossOrigin("*")
		@RequestMapping(value = "/getPatientDetailsByID", method = RequestMethod.GET)
		public String getPatientDetails(int id) {   
			//System.out.println("SSSS"+id);
		//	System.out.println("SSSS"+cmBO.getPatientDetails(id).toString());
			Gson gson = new Gson();
			return gson.toJson(cmBO.getPatientDetails(id)) ;
		}
	

	@CrossOrigin("*")
	@RequestMapping(value = "/getDoctorsDetails", method = RequestMethod.GET)
	public String getDoctorsDetails() {
		Gson gson = new Gson();
		// System.out.println(gson.toJson(cmBO.getDoctorsDetails()));
		return gson.toJson(cmBO.getDoctorsDetails());
	}

	@RequestMapping(value = "/getNotifications", method = RequestMethod.GET)
	public String getNotifications() {
		Gson gson = new Gson();
		// convert your list to json
		String jsonCartList = gson.toJson(cmBO.getNotifications());
		// print your generated json
		System.out.println("jsonCartList: " + jsonCartList);
		return jsonCartList;
	}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public String submit(@RequestParam("file") MultipartFile file) throws IOException {
		 String img = file.getName();
         long imgSize = file.getSize();
     	 InputStream fis =  file.getInputStream();
     	 String out = "";
     	// JSONObject json = new JSONObject();
     	 if(imgSize > 0){
     		
      		CloudStorageHelper csh = new CloudStorageHelper();
      		String link = null; 
      		
      		try {
      				link = csh.uploadFile(fis, img);
      				String bucketName = "tumorboard.appspot.com";
      				
          		   out=DetectTextGcs.detectTextGcs("gs://"+bucketName+"/"+StringUtils.substringAfterLast(link, "/"));
          		// json.put("out", out);
          		} catch (Exception e) {
					e.printStackTrace();
				}
      			}
     	//System.out.println(json.toString());
     	 	//return json.toString();
     	 return out;
	
	}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/threcordsByID", method = RequestMethod.GET)
	public String getthrecords(int id) {
	      Gson gson = new Gson();
	     
	    //  System.out.println(gson.toJson(thBO.getthrecords()));
		return gson.toJson(cmBO.getthrecords(id)) ;
	}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/timelineByID", method = RequestMethod.GET)
	public String gettimelinerecords(int id) {
	      Gson gson = new Gson();
	     
	    //  System.out.println(gson.toJson(thBO.getthrecords()));
		return gson.toJson(cmBO.gettimelinerecords(id)) ;
	}
	
	
	@CrossOrigin("*")
	@RequestMapping(value = "/getfamilymedicalhistory",method = RequestMethod.GET)
	 public String getfamilymedicalhistory(int id) {
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getfamilymedicalhistory(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	@CrossOrigin("*")
	@RequestMapping(value = "/getbiomarkers",method = RequestMethod.GET)
	 public String getbiomarkers(int id) {
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getbiomarkers(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	@CrossOrigin("*")
	@RequestMapping(value = "/getcancerinfo",method = RequestMethod.GET)
	 public String getcancerinfo(int id){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getcancerinfo(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	@CrossOrigin("*")
	@RequestMapping(value = "/getpatientillness",method = RequestMethod.GET)
	 public String getpatientillness(int id){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getpatientillness(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	@CrossOrigin("*")
	@RequestMapping(value = "/getphysicalexamination",method = RequestMethod.GET)
	 public String getphysicalexamination(int id){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getphysicalexamination(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	@CrossOrigin("*")
	@RequestMapping(value = "/gettumorinformation",method = RequestMethod.GET)
	 public String gettumorinformation(int id){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.gettumorinformation(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	@CrossOrigin("*")
	@RequestMapping(value = "/getmedications",method = RequestMethod.GET)
	 public String getmedications(int id){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getmedications(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/getpastmedicalhistory",method = RequestMethod.GET)
	 public String getpastmedicalhistory(int id){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getpastmedicalhistory(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}


	@CrossOrigin("*")
	@RequestMapping(value = "/getallergies",method = RequestMethod.GET)
	 public String getallergies(int id){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getallergies(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	@CrossOrigin("*")
	@RequestMapping(value = "/getcomorbidities",method = RequestMethod.GET)
	 public String getcomorbidities(int id){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getcomorbidities(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/getNursenavigator",method = RequestMethod.GET)
	 public String getNursenavigator(){
			Gson gson = new Gson();
		    // convert your list to json
		    String jsonCartList = gson.toJson(cmBO.getNursenavigator());
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/getCheckconclusion",method = RequestMethod.GET)
	 public String getCheckconclusion(int id){
		System.out.println("hello");	
		Gson gson = new Gson();
		    // convert your list to json
			System.out.println(id);
		    String jsonCartList = gson.toJson(cmBO.getCheckconclusion(id));
		    // print your generated json
		    System.out.println("jsonCartList: " + jsonCartList);
			return jsonCartList ;
			}
	
	@CrossOrigin("*")
	@RequestMapping(value = "/getTumorboardDetails", method = RequestMethod.GET)
	public String  getTumorboardDetails(int tbid) {
	      Gson gson = new Gson();
	     
	     // System.out.println(gson.toJson(cmBO.getMeetingDetails()));
		return gson.toJson(cmBO. getTumorboardDetails(tbid)) ;
	}
	
	
	}

