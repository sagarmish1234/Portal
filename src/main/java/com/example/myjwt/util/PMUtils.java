package com.example.myjwt.util;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;

import com.example.myjwt.models.Role;
import com.example.myjwt.models.enm.EGrade;
import com.example.myjwt.models.enm.ERole;
import com.example.myjwt.security.jwt.JwtAuthenticationFilter;
import com.example.myjwt.security.jwt.JwtTokenProvider;
import com.example.myjwt.security.services.UserPrincipal;
import com.example.myjwt.security.services.CustomUserDetailsService;
import java.time.Instant;

public class PMUtils {

	private static final Logger logger = LoggerFactory.getLogger(PMUtils.class);

	public static String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");

		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7, headerAuth.length());
		}

		return null;
	}

	public static Long getUserIdFromRequest(HttpServletRequest request, JwtTokenProvider jwtUtils,
			CustomUserDetailsService userDetailsService) {
		try {
			String jwt = PMUtils.parseJwt(request);
			if (jwt != null && jwtUtils.validateToken(jwt)) {
				String username = jwtUtils.getUserNameFromJwtToken(jwt);

				UserPrincipal userDetails = (UserPrincipal) userDetailsService.loadUserByUsername(username);
				return userDetails.getId();
			}
		} catch (Exception e) {
			logger.error("Cannot set user authentication: {}", e);

		}
		return null;
	}

	public static List<Long> getSBUHeadEligibleGrades() {
		List<Long> eligibleGrades = new ArrayList<Long>();

		eligibleGrades.add(Long.valueOf(EGrade.SVP.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.VP.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.AVP.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.SD.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.D.ordinal() + 1));

		return eligibleGrades;
	}

	public static List<Long> getPDLEligibleGrades() {
		List<Long> eligibleGrades = new ArrayList<Long>();
		eligibleGrades.add(Long.valueOf(EGrade.AVP.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.SD.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.D.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.AD.ordinal() + 1));

		return eligibleGrades;
	}

	public static List<Long> getEDLEligibleGrades() {
		List<Long> eligibleGrades = new ArrayList<Long>();

		eligibleGrades.add(Long.valueOf(EGrade.D.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.AD.ordinal() + 1));
		eligibleGrades.add(Long.valueOf(EGrade.SM.ordinal() + 1));

		return eligibleGrades;
	}

	public static Date stringToSQLDate(String strDate) { // 2021-12-20 20:22:51
		java.sql.Date sqlStartDate = null;
		try {
			SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			java.util.Date date = sdf1.parse(strDate);
			sqlStartDate = new java.sql.Date(date.getTime());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return sqlStartDate;
	}

	public static java.util.Date stringToUtilDate(String sDate1, int format) {
		if (sDate1 == null || sDate1.equals(""))
			return null;
		try {
			switch (format) {
			case 1:
				return new SimpleDateFormat("MM/dd/yyyy HH:mm").parse(sDate1);
			case 2:
				return new SimpleDateFormat("MM/dd/yyyy").parse(sDate1);
			case 3:
				return new SimpleDateFormat("yyyy-MM-dd").parse(sDate1);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	public static long differenceBetweenTwoDates(java.util.Date dateBefore, java.util.Date dateAfter) {
		return ChronoUnit.DAYS.between(dateBefore.toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
				dateAfter.toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
	}

	public static Date instantToSqlDate(Instant instant) {
		Date date = new java.sql.Date(Date.from(instant).getTime());
		
		return date;
	}

	public static ERole getMainRole(Set<Role> roles) {

		ArrayList<ERole> roleList = new ArrayList<ERole>();

		for (Role role : roles) {
			roleList.add(role.getName());
		}

		if (roleList.contains(ERole.Admin)) {
			return ERole.Admin;
		} else if (roleList.contains(ERole.PDL)) {
			return ERole.PDL;
		} else if (roleList.contains(ERole.EDL)) {
			return ERole.EDL;
		} else if (roleList.contains(ERole.LOBLead)) {
			return ERole.LOBLead;
		} else if (roleList.contains(ERole.AccountLead)) {
			return ERole.AccountLead;
		} else if (roleList.contains(ERole.ProjectManager)) {
			return ERole.ProjectManager;
		} else if (roleList.contains(ERole.Associate)) {
			return ERole.Associate;
		} else if (roleList.contains(ERole.HR)) {
			return ERole.HR;
		} else if (roleList.contains(ERole.TAG)) {
			return ERole.TAG;
		}

		return null;
	}
}
