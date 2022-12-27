package com.example.myjwt.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.example.myjwt.exception.IncorrectCurrentPasswordException;
import com.example.myjwt.payload.request.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.myjwt.beans.Email;
import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.exception.RecordNotFoundException;
import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.Hexcode;
import com.example.myjwt.models.Role;
import com.example.myjwt.models.User;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.payload.UserProfile;
import com.example.myjwt.payload.response.AllAssociatesResponse;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.JwtAuthenticationResponse;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.HexCodeRepository;
import com.example.myjwt.repo.RoleRepository;
import com.example.myjwt.repo.UserRepository;
import com.example.myjwt.security.jwt.JwtTokenProvider;
import com.example.myjwt.security.services.EmailService;
import com.example.myjwt.security.services.SettingService;
import com.example.myjwt.util.AppConstants;
import com.example.myjwt.util.EmailConstants;

import net.bytebuddy.utility.RandomString;

@RestController
@RequestMapping("/api/auth")
//@ConfigurationProperties(prefix="email")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	private AssignmentReportRepository assignmentReportRepository;

	@Autowired
	private AssignmentUserRepository assignmentUserRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	AssignmentUserRepository assignmentUserRepo;

	@Autowired
	HexCodeRepository hexCodeRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	SettingService settingService;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	EmailService emailService;

	private int otpToken;

	private Long createdTime;
	private Long currentTime;

	private static final long OTP_VALID_DURATION = 5 * 60 * 1000; // 5 minutes

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getAssociateId(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.generateJwtToken(authentication);

		User user = userRepository.findByAssociateId(loginRequest.getAssociateId()).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with username: " + loginRequest.getAssociateId()));

		if (user.getIsVerified()) {

			if (user.getIsApproved()) {

				if (user.getIsActive()) {

					AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc().orElse(null);

					String userFullName = "Admin";
					if (report != null) {
						List<AssignmentUser> usersList = assignmentUserRepository
								.findByAssignmentReportAndAssociateID(report, loginRequest.getAssociateId());

						if (!usersList.isEmpty()) {
							AssignmentUser assignmentUser = usersList.get(0);
							userFullName = assignmentUser.getAssociateName();
						}
					}

					UserProfile userProfile = new UserProfile(user.getId(), user.getAssociateId(),
							new JwtAuthenticationResponse(jwt));
					userProfile.setUserFullName(userFullName);

					ArrayList<String> roles = new ArrayList<String>();
					if (user.getRoles() != null) {
						int i=0;
						Iterator<Role> train = user.getRoles().iterator();
						while (train.hasNext()) {
							roles.add(train.next().getName().name());
						}
					}

					userProfile.setRoles(roles);
					return ResponseEntity.ok(userProfile);
				} else {
					return ResponseEntity.badRequest().body(new ApiResponse(false, "Error: User not active"));
				}
			} else {
				return ResponseEntity.badRequest().body(new ApiResponse(false, "Error: Approval pending with manager"));
			}
		} else {
			return ResponseEntity.badRequest().body(new ApiResponse(false, "Error: Email not verified"));
		}
	}

	@GetMapping("/verify")
	public ResponseEntity<?> verifyUser(@RequestParam("code") String code) {
		System.out.println(code);
		Hexcode hexcode = hexCodeRepository.findByCode(code);
		if (hexcode != null) {
			Long refId = hexcode.getRefId();
			User user = userRepository.findById(refId).get();
			if (user != null) {
				user.setIsVerified(true);
				userRepository.save(user);
				return ResponseEntity.ok().body(new ApiResponse(true, "User verified Successfully"));
			}
		}
		return ResponseEntity.badRequest().body(new ApiResponse(false, "User has not verified."));

	}

	@PostMapping("/forgotpassword")
	public ResponseEntity<?> verifiEmail(@Valid @RequestBody ForgotPasswordRequest request) throws Exception {

		User user = userRepository.findByAssociateId(request.getAssociateId())
				.orElseThrow(() -> new RecordNotFoundException("User Not Found"));

		int generateOTP = generateOTP();
		otpToken = generateOTP;
		createdTime = System.currentTimeMillis();

		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new RecordNotFoundException("No assignment report found"));

		List<AssignmentUser> usersList = assignmentUserRepo.findByAssignmentReportAndAssociateID(report,
				request.getAssociateId());

		if (usersList.isEmpty()) {
			return ResponseEntity.badRequest().body(new ApiResponse(false, "Error: Only JPMC Associate can login"));
		}

		AssignmentUser assignmentUser = usersList.get(0);

		sendOTPEmail(user, generateOTP, assignmentUser);
		return ResponseEntity.ok().body(new ApiResponse(true, "OTP has sent to your mail successfully!!"));
	}

	public int generateOTP() {

		Random random = new Random();
		int otp = 100000 + random.nextInt(900000);
		return otp;
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOTP(@RequestBody OTPRequest otprequest) {

		currentTime = System.currentTimeMillis();

//		System.out.println("currentTime="+currentTime);

		if ((currentTime - createdTime) < OTP_VALID_DURATION) {
			if (otpToken == otprequest.getOtp()) {
				return ResponseEntity.ok().body(new ApiResponse(true, "OTP Verified Successfully!!"));
			}
		}

		return ResponseEntity.badRequest().body(new ApiResponse(false, "OTP does'nt verified"));

	}

	@PostMapping("/update-password")
	public ResponseEntity<?> updatePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {

		User user = userRepository.findByAssociateId(changePasswordRequest.getAssociateId())
				.orElseThrow(() -> new RecordNotFoundException("User Not Found"));

		user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
		userRepository.save(user);

		return ResponseEntity.ok().body(new ApiResponse(true, "Password Updated successfully!!"));

	}
	@PostMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        System.out.println(updatePasswordRequest);
		User user = userRepository.findByAssociateId(updatePasswordRequest.getAssociateId())
				.orElseThrow(() -> new RecordNotFoundException("User Not Found"));
		if(this.passwordEncoder.matches(updatePasswordRequest.getCurrentPassword(), user.getPassword()))
		{
			user.setPassword(passwordEncoder.encode(updatePasswordRequest.getPassword()));
		    userRepository.save(user);
	    }
		else
		{
          throw new IncorrectCurrentPasswordException("Entered incorrect current password");
		}
		return ResponseEntity.ok().body(new ApiResponse(true, "Password Updated successfully!!"));
	}

	private void sendOTPEmail(User user, int otp, AssignmentUser assignmentUser)
			throws MessagingException, UnsupportedEncodingException {

		try {
			Email email = new Email();
			email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
			email.setTo(settingService.getEmailId(user.getAssociateId() + "", null, null));
			email.setSubject("OTP(One-Time-Password) Verification");

			Map<String, Object> model = new HashMap<String, Object>();
			model.put("name", assignmentUser.getAssociateName());
			model.put("otp", Integer.toString(otp));

			email.setModel(model);
			emailService.sendOTPEmail(email);

		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, HttpServletRequest request)
			throws UnsupportedEncodingException, MessagingException {

		System.out.println("---------------------------------------------------------------------");
		if (userRepository.findByAssociateId(signUpRequest.getAssociateId()).orElse(null) != null) {
			return ResponseEntity.badRequest().body(new ApiResponse(false, "Error: Username is already exist!"));
		}

		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new RecordNotFoundException("No assignment report found"));

		List<AssignmentUser> usersList = assignmentUserRepo.findByAssignmentReportAndAssociateID(report,
				signUpRequest.getAssociateId());

		if (usersList.isEmpty()) {
			return ResponseEntity.badRequest().body(new ApiResponse(false, "Error: Only JPMC Associate can register"));
		}

		AssignmentUser assignmentUser = usersList.get(0);

		User user = new User();

		user.setIsVerified(false);
		user.setIsActive(true);
		user.setIsApproved(false);

		user.setAssociateId(signUpRequest.getAssociateId());
		user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

		Role userRole = roleRepository.findByName(ERole.Associate);

		user.setRoles(Collections.singleton(userRole));

		String siteURL = request.getRequestURL().toString();

		Hexcode hexCode = new Hexcode();
		hexCode.setTableName(AppConstants.TBL_USER);
		hexCode.setAction(AppConstants.HEXCODE_ACTION_VALIDATE);
		hexCode.setSubAction(AppConstants.HEXCODE_SUBACTION_EMAIL);
		String randomCode = RandomString.make(64);
		hexCode.setCode(randomCode);

		User result = registerTransaction(user, hexCode, assignmentUser);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}")
				.buildAndExpand(result.getAssociateId()).toUri();
		return ResponseEntity.created(location).body(
				new ApiResponse(true, "User registered successfully! Please verify the mail that has sent to you!!"));
	}

	@Transactional
	private User registerTransaction(User user, Hexcode hexCode, AssignmentUser assignmentUser)
			throws UnsupportedEncodingException, MessagingException {
		User result = userRepository.save(user);
		hexCode.setRefId(user.getId());
		hexCodeRepository.save(hexCode);
		sendVerificationEmail(user, AppConstants.UI_URL, hexCode.getCode(), assignmentUser);
		return result;
	}

	private void sendVerificationEmail(User user, String siteURL, String hexCode, AssignmentUser assignmentUser)
			throws MessagingException, UnsupportedEncodingException {

		try {
			Email email = new Email();
			email.setFrom(settingService.getEmailId(EmailConstants.DEFAULT_FROM, null, null));
			email.setTo(settingService.getEmailId(user.getAssociateId() + "", null, null));
			email.setSubject("Please verify your registration");

			String verifyURL = siteURL + "/#/ui/verify?code=" + hexCode;
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("name", assignmentUser.getAssociateName());
			model.put("url", verifyURL);

			email.setModel(model);
			emailService.sendVerificationEmail(email);

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
