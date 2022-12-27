package com.example.myjwt.payload.response;


public class AllAssociatesResponse implements Comparable<AllAssociatesResponse> {

	private Long associateId;
	private String associateName;
	private String serviceLine;
	private String lOB;
	private String onOff;
	private Long upcomingDrives;
	private Long pastDrives;

	public AllAssociatesResponse(Long associateId, String associateName, String serviceLine, String lOB, String onOff,
			Long upcomingDrives, Long pastDrives) {
		super();
		this.associateId = associateId;
		this.associateName = associateName;
		this.serviceLine = serviceLine;
		this.lOB = lOB;
		this.onOff = onOff;
		this.upcomingDrives = upcomingDrives;
		this.pastDrives = pastDrives;
	}

	public Long getAssociateId() {
		return associateId;
	}



	public void setAssociateId(Long associateId) {
		this.associateId = associateId;
	}



	public String getAssociateName() {
		return associateName;
	}



	public void setAssociateName(String associateName) {
		this.associateName = associateName;
	}



	public String getServiceLine() {
		return serviceLine;
	}



	public void setServiceLine(String serviceLine) {
		this.serviceLine = serviceLine;
	}



	public String getlOB() {
		return lOB;
	}



	public void setlOB(String lOB) {
		this.lOB = lOB;
	}



	public String getOnOff() {
		return onOff;
	}



	public void setOnOff(String onOff) {
		this.onOff = onOff;
	}



	public Long getUpcomingDrives() {
		return upcomingDrives;
	}



	public void setUpcomingDrives(Long upcomingDrives) {
		this.upcomingDrives = upcomingDrives;
	}



	public Long getPastDrives() {
		return pastDrives;
	}



	public void setPastDrives(Long pastDrives) {
		this.pastDrives = pastDrives;
	}



	@Override
	public int compareTo(AllAssociatesResponse o) {

		if (pastDrives == null)
			pastDrives = 0L;

		if (o.pastDrives == null)
			o.pastDrives = 0L;

		if (pastDrives == o.pastDrives)
			return 0;
		else if (pastDrives < o.pastDrives)
			return 1;
		else
			return -1;

	}


}
