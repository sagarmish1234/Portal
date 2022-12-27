package com.example.myjwt.security.services;

import com.example.myjwt.beans.Email;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {
	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private Configuration freemarkerConfig;

	private void sendEmail(Email mail, String template) throws MessagingException, IOException, TemplateException {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
				StandardCharsets.UTF_8.name());

		// helper.addAttachment("logo.png", new
		// ClassPathResource("memorynotfound-logo.png"));

		Template t = freemarkerConfig.getTemplate(template);
		String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, mail.getModel());

		helper.setTo(mail.getTo());
		helper.setText(html, true);
		helper.setSubject(mail.getSubject());
		helper.setFrom(mail.getFrom());

		emailSender.send(message);
	}

	public void sendAssignmentEndDateEmail(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "assignmentending.ftl");
	}

	public void sendProjectEndDateEmail(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "projectsending.ftl");
	}
	
	public void sendPanelistsEmail(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "panelnomination.ftl");
	}
	
	public void sendVerificationEmail(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "emailverify.ftl");
	}

	public void sendLeaveConflictEmail(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "leaveConflictNotification.ftl");
	}

	public void sendOTPEmail(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "otpverify.ftl");
	}
	
	public void sendReferralListEmail(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "referrals.ftl");
	}

	public void sendTrainingConfirmation(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "trainingconfirmation.ftl");
	}

	public void sendTrainingReminder(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "trainingreminder.ftl");
	}
	
	public void sendUpdatedStatusEmail(Email mail) throws MessagingException, IOException, TemplateException {
		sendEmail(mail, "statusUpdate.ftl");
	}

}