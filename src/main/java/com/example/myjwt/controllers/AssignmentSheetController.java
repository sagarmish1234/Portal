package com.example.myjwt.controllers;

import com.example.myjwt.beans.AsgnmtAssociate;
import com.example.myjwt.beans.Email;
import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.payload.response.FileUploadResponse;
import com.example.myjwt.repo.UserRepository;
import com.example.myjwt.security.services.EmailService;
import com.example.myjwt.security.services.SettingService;
import com.example.myjwt.util.AppConstants;
import com.example.myjwt.util.EmailConstants;
import com.example.myjwt.util.FileUtil;
import com.example.myjwt.util.PMUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;

import javax.transaction.Transactional;
import javax.xml.XMLConstants;

@Controller
@RequestMapping("/api")
public class AssignmentSheetController {

	public final int BATCH_SIZE = 500;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	AssignmentUserRepository assignmentUserRepository;

	@Autowired
	AssignmentReportRepository assignmentReportRepository;

	@Autowired
	EmailService emailService;

	@Autowired
	SettingService settingService;

	/**
	 * Method to upload multiple files
	 * 
	 * @param files
	 * @return FileResponse
	 */
	@PostMapping("/assignmentsheet")
	public ResponseEntity<FileUploadResponse> uploadFiles(@RequestParam("file") MultipartFile[] files) {

		System.out.println("files[0].getOriginalFilename() step 1:" + files[0].getOriginalFilename());

		try {
			List<String> fileNames = new ArrayList<>();
			byte[] bytes = new byte[0];
			try {
				bytes = files[0].getBytes();

				AssignmentReport report = new AssignmentReport();

				System.out.println("files[0].getOriginalFilename() step 2:" + files[0].getOriginalFilename());
				report.setFilename(files[0].getOriginalFilename());
				System.out.println("files[0].getOriginalFilename() step 3:" + files[0].getOriginalFilename());
				assignmentReportRepository.save(report);
				System.out.println("files[0].getOriginalFilename() step 4 - saved report in db:" + files[0].getOriginalFilename());

				readAssignmentXML(new String(bytes), report);
				
				System.out.println("files[0].getOriginalFilename() step 5 - read:" + files[0].getOriginalFilename());

				System.out.println("bytes.lenht -->" + bytes.length);
				fileNames.add(files[0].getOriginalFilename());
			} catch (IOException e) {
				e.printStackTrace();
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new FileUploadResponse("Files uploaded successfully: " + fileNames));

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new FileUploadResponse("Exception to upload files!"));
		}
	}


	private void readAssignmentXML(String content, AssignmentReport report) {
		
		String readingLine = "";
		
		try {

			SAXBuilder sax = new SAXBuilder();

			content = content.replaceAll("&nbsp;", "");
			content = content.replaceAll("&", "&amp;");

			sax.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
			sax.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");

			// XML is a local file
			InputStream stream = new ByteArrayInputStream(content.getBytes("UTF-8"));
			Document doc = sax.build(stream);

			Element rootNode = doc.getRootElement();
			List<Element> trList = rootNode.getChildren("tr");
			
			System.out.println("readAssignmentXML:1" );

			List<AsgnmtAssociate> asgnmtEndingList = new ArrayList<AsgnmtAssociate>();
			HashMap<Long, AsgnmtAssociate> projectsEndingList = new HashMap<Long, AsgnmtAssociate>();
			List<AssignmentUser> assignmentUserList = new ArrayList<AssignmentUser>();
			
			System.out.println("readAssignmentXML:"+trList.size() );

			for (int rowNum = 1; rowNum < trList.size(); rowNum++) {
				

				AsgnmtAssociate asgnmtAssociate = new AsgnmtAssociate();

				AssignmentUser assignmentUser = new AssignmentUser();
				assignmentUser.setAssignmentReport(report);

				List<Element> tdList = trList.get(rowNum).getChildren();
				int index = 0;
				readingLine = "";
				for (Element cell : tdList) {
					readingLine = readingLine + cell.getValue()+":";
					asgnmtAssociate.setValue(index, cell.getValue());
					assignmentUser.setValue(index, cell.getValue());
					assignmentUserList.add(assignmentUser);
					index++;
				}

				if (PMUtils.differenceBetweenTwoDates(new Date(),
						asgnmtAssociate.getAssignmentEnddate()) < AppConstants.ASSIGNMENT_ENDING_CAP)
					asgnmtEndingList.add(asgnmtAssociate);
				if (PMUtils.differenceBetweenTwoDates(new Date(),
						asgnmtAssociate.getProjectEndDate()) < AppConstants.PROJECT_ENDING_CAP)
					projectsEndingList.put(asgnmtAssociate.getProjectID(), asgnmtAssociate);
				// break;
			}

			insertAssignmentUsersInDB(assignmentUserList);
			
			System.out.println("Projects ending in next 60 days   ==== " + projectsEndingList.size());
			System.out.println("Assignments ending in next 60 days   ==== " + asgnmtEndingList.size());

			try {
				// EmailUtil util = new EmailUtil();
				// util.sendEmailAssignmentsAndProjectsEnding(mailSender, asgnmtEndingList,
				// projectsEndingList);

				Email email = new Email();
				email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
				email.setTo(settingService.getEmailId(EmailConstants.ASSIGNMENTS_ENDING_TO, "ADM", null));
				email.setCc(settingService.getEmailId(EmailConstants.ASSIGNMENTS_ENDING_CC, "ADM", null));
				email.setSubject(
						"!! Alert !! - Assignment ending in next " + AppConstants.ASSIGNMENT_ENDING_CAP + " days");

				Map<String, Object> model = new HashMap<String, Object>();
				Collections.sort(asgnmtEndingList, AsgnmtAssociate.AssignmentEndComparator);
				model.put("asgnmtEndingList", asgnmtEndingList);
				model.put("assignmentLimitDays", AppConstants.ASSIGNMENT_ENDING_CAP);

				email.setModel(model);
				emailService.sendAssignmentEndDateEmail(email);

				Email emailProjects = new Email();
				emailProjects.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
				emailProjects.setTo(settingService.getEmailId(EmailConstants.PROJECTS_ENDING_TO, "ADM", null));
				emailProjects.setCc(settingService.getEmailId(EmailConstants.PROJECTS_ENDING_CC, "ADM", null));
				emailProjects.setSubject(
						"!! Alert !! - Projects ending in next " + AppConstants.PROJECT_ENDING_CAP + " days");

				Map<String, Object> modelProjects = new HashMap<String, Object>();
				
				List<Map.Entry<Long, AsgnmtAssociate>> entryList = new ArrayList<Map.Entry<Long, AsgnmtAssociate>>(
						projectsEndingList.entrySet());

				Collections.sort(entryList, AsgnmtAssociate.ProjectEndComparator);
				
				modelProjects.put("projectsEndingList", projectsEndingList);
				modelProjects.put("projectLimitDays", AppConstants.PROJECT_ENDING_CAP);

				emailProjects.setModel(modelProjects);
				emailService.sendProjectEndDateEmail(emailProjects);

			} catch (Exception ex) {
				ex.printStackTrace();
			}

		} catch (IOException | JDOMException e) {
			System.out.println(readingLine);
			e.printStackTrace();
		}
	}

	@Transactional
	public void insertAssignmentUsersInDB(List<AssignmentUser> assignmentUserList) {
		assignmentUserRepository.saveAll(assignmentUserList);
	}

}
