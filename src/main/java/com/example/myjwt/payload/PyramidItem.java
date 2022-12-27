package com.example.myjwt.payload;

import com.example.myjwt.beans.AsgnmtAssociate;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.User;
import com.example.myjwt.models.enm.EGrade;
import com.example.myjwt.util.AppConstants;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

public class PyramidItem {
	private EGrade grade;
	private Double offshoreBillFte = 0.0;
	private Double offshoreNBLFte = 0.0;

	private Double onsiteBillFte = 0.0;
	private Double onsiteNBLFte = 0.0;

	public void addToExisting(AssignmentUser assignmentUser) {
		if (assignmentUser.getOnOff().equalsIgnoreCase(AppConstants.OFFSHORE)) {
			if (assignmentUser.getBillabilityStatus()) {
				offshoreBillFte = offshoreBillFte + assignmentUser.getfTE();
			} else {
				offshoreNBLFte = offshoreNBLFte + assignmentUser.getfTE();
			}
		} else {
			if (assignmentUser.getBillabilityStatus()) {
				onsiteBillFte = onsiteBillFte + assignmentUser.getfTE();
			} else {
				onsiteNBLFte = onsiteNBLFte + assignmentUser.getfTE();
			}

		}
	}


	public PyramidItem() {
	}





	public Double getOffshoreBillFte() {
		return offshoreBillFte;
	}


	public void setOffshoreBillFte(Double offshoreBillFte) {
		this.offshoreBillFte = offshoreBillFte;
	}


	public Double getOffshoreNBLFte() {
		return offshoreNBLFte;
	}


	public void setOffshoreNBLFte(Double offshoreNBLFte) {
		this.offshoreNBLFte = offshoreNBLFte;
	}


	public Double getOnsiteBillFte() {
		return onsiteBillFte;
	}


	public void setOnsiteBillFte(Double onsiteBillFte) {
		this.onsiteBillFte = onsiteBillFte;
	}


	public Double getOnsiteNBLFte() {
		return onsiteNBLFte;
	}


	public void setOnsiteNBLFte(Double onsiteNBLFte) {
		this.onsiteNBLFte = onsiteNBLFte;
	}


	public EGrade getGrade() {
		return grade;
	}


	public void setGrade(EGrade grade) {
		this.grade = grade;
	}
	
	public static Comparator<PyramidItem> PyramidItemOnGrade = new Comparator<PyramidItem>() {

		public int compare(PyramidItem s1, PyramidItem s2) {
			if(s1.grade.ordinal() < s2.grade.ordinal())
	            return 1;
	        else if(s1.grade.ordinal() > s2.grade.ordinal())
	            return -1;
	        else
	            return 1;
		}
	};

}
