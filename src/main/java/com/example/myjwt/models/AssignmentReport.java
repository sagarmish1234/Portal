package com.example.myjwt.models;

import java.util.Comparator;

import javax.persistence.*;

import com.example.myjwt.beans.AsgnmtAssociate;
import com.example.myjwt.models.audit.UserDateAudit;
import com.example.myjwt.models.enm.EGrade;

@Entity
@Table(name = "assignment")
public class AssignmentReport extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 80)
	private String filename;

	public AssignmentReport() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	/* Comparator for sorting the list by Student Name */
	public static Comparator<AssignmentReport> AssignmentReportComparator = new Comparator<AssignmentReport>() {

		public int compare(AssignmentReport s1, AssignmentReport s2) {

			// ascending order
			if ((s1.getId() - s2.getId()) < 0)
				return 1;
			else if ((s1.getId() - s2.getId()) > 0)
				return -1;
			else
				return 0;

			// descending order
			// return StudentName2.compareTo(StudentName1);
		}
	};

}