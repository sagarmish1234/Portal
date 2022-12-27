package com.example.myjwt.beans;

import java.util.Date;
import java.util.Map;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.example.myjwt.models.enm.EGrade;
import com.example.myjwt.util.PMUtils;

import java.util.ArrayList;
import java.util.Comparator;

public class Mapping {
	public static EGrade getMappedGrade(String grade) {
		switch (grade) {
		case "A":
		case "Associate":
		case "Assistant":
			return EGrade.A;
		case "PAT":
		case "PT":
		case "P":
			return EGrade.PAT;
		case "AD":
			return EGrade.AD;
		case "D":
			return EGrade.D;
		case "M":
			return EGrade.M;
		case "SA":
			return EGrade.SA;
		case "SD":
			return EGrade.SD;
		case "PA":
			return EGrade.PA;
		case "Contractor":
			return EGrade.CWR;
		case "VP":
			return EGrade.VP;
		case "SVP":
			return EGrade.SVP;
		case "SM":
			return EGrade.SM;
		case "AVP":
			return EGrade.AVP;
		}
		return EGrade.UNKNOWN;
	}

	public static ArrayList<String> getOriginalGradesFromMapped(String grade) {

		ArrayList<String> grades = new ArrayList<String>();

		switch (grade) {
		case "A":
			grades.add("A");
			grades.add("Associate");
			grades.add("Assistant");
			break;

		case"PAT":
			grades.add("PAT");
			grades.add("PT");
			grades.add("P");
			break;

		case "AD":
		case "D":
		case "M":
		case "SA":
		case "SD":
		case "PA":
		case "VP":
		case "SVP":
		case "SM":
		case "AVP":
			grades.add(grade);
			break;

		case "CWR":
			grades.add("Contractor");
			break;

		default:
			grades.add("");
			break;
		}
		return grades;
	}

}
