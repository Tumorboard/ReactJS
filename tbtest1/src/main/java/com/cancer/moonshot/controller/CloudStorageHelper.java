package com.cancer.moonshot.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.ServletException;

import org.apache.commons.io.FilenameUtils;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.Acl.Role;
import com.google.cloud.storage.Acl.User;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

// [START example]
public class CloudStorageHelper {
  private static Storage storage = null;

  // [START init]
  static {
    storage = StorageOptions.getDefaultInstance().getService();
  }
  // [END init]

  // [START uploadFile]
  /**
   * Uploads a file to Google Cloud Storage to the bucket specified in the BUCKET_NAME
   * environment variable, appending a timestamp to end of the uploaded filename.
   */
  public String uploadFile(String filePath,String imageName)
      throws IOException, ServletException {
    checkFileExtension(imageName);
   String projectId = "tumorboard";
	String bucketName = "tumorboard.appspot.com";

    DateTimeFormatter dtf = DateTimeFormat.forPattern("-YYYY-MM-dd-HHmmssSSS");
    DateTime dt = DateTime.now(DateTimeZone.UTC);
    String dtString = dt.toString(dtf);
    String fileName = imageName + dtString;
    if(imageName.contains(".")){
    	String ext = FilenameUtils.getExtension(imageName);
    	fileName = imageName.replace("."+ext, "") + dtString +"."+ext;
    }
    // the inputstream is closed by default, so we don't need to close it here
    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    BlobId blobId = BlobId.of(bucketName, fileName);
    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setAcl(new ArrayList<>(Arrays.asList(Acl.of(User.ofAllUsers(), Role.READER)))).build();
    blobInfo = storage.create(blobInfo, Files.readAllBytes(Paths.get(filePath)));

    // return the public download link
    return blobInfo.getSelfLink();
  }
  // [END uploadFile]
  @SuppressWarnings("deprecation")
public String uploadFile(InputStream is,String imageName)
	      throws IOException, ServletException {
	    checkFileExtension(imageName);
	   String projectId = "tumorboard";
		String bucketName = "tumorboard.appspot.com";

	    DateTimeFormatter dtf = DateTimeFormat.forPattern("-YYYY-MM-dd-HHmmssSSS");
	    DateTime dt = DateTime.now(DateTimeZone.UTC);
	    String dtString = dt.toString(dtf);
	    String fileName = imageName + dtString;
	    if(imageName.contains(".")){
	    	String ext = FilenameUtils.getExtension(imageName);
	    	fileName = imageName.replace("."+ext, "") + dtString +"."+ext;
	    }
	    // the inputstream is closed by default, so we don't need to close it here
	    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
	    BlobId blobId = BlobId.of(bucketName, fileName);
	    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setAcl(new ArrayList<>(Arrays.asList(Acl.of(User.ofAllUsers(), Role.READER)))).build();
	    blobInfo = storage.create(blobInfo,is);

	    // return the public download link
	    return blobInfo.getSelfLink();
	  }
  // [START checkFileExtension]
  /**
   * Checks that the file extension is supported.
   */
  private void checkFileExtension(String fileName) throws ServletException {
    if (fileName != null && !fileName.isEmpty() && fileName.contains(".")) {
      String[] allowedExt = { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx",
    		  ".webm", ".mkv", ".flv", ".flv", ".vob", ".ogv", ".ogg", ".drc", ".gif", ".gifv", ".mng", ".avi", ".MTS", ".M2TS", ".mov", ".qt", ".wmv", ".yuv", ".rm", ".rmvb", ".asf", ".amv", ".mp4", ".m4p", ".m4v", ".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mpg", ".mpeg", ".m2v", ".m4v", ".svi", ".3gp", ".3g2", ".mxf", ".roq", ".nsv", ".flv", ".f4v", ".f4p", ".f4a", ".f4b"};
      for (String ext : allowedExt) {
        if (fileName.toLowerCase().endsWith(ext)) {
          return;
        }
      }
      throw new ServletException("file must be an image");
    }
  }
  // [END checkFileExtension]
}
// [END example]