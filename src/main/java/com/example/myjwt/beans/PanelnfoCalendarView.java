package com.example.myjwt.beans;

public class PanelnfoCalendarView {

	private Long totalPanels;
	private Long panelsAvailable;
	public PanelnfoCalendarView(Long totalPanels, Long panelsAvailable) {
		super();
		this.totalPanels = totalPanels;
		this.panelsAvailable = panelsAvailable;
	}
	public Long getTotalPanels() {
		return totalPanels;
	}
	public void setTotalPanels(Long totalPanels) {
		this.totalPanels = totalPanels;
	}
	public Long getPanelsAvailable() {
		return panelsAvailable;
	}
	public void setPanelsAvailable(Long panelsAvailable) {
		this.panelsAvailable = panelsAvailable;
	}
	
	
}
