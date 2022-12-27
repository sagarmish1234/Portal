package com.example.myjwt.beans;

import java.util.ArrayList;
import java.util.HashMap;

public class BillableReport {

	private ArrayList<BillabilityRow> offshore = new ArrayList<BillabilityRow> ();
	private ArrayList<BillabilityRow> onsite = new ArrayList<BillabilityRow> ();
	
	public BillableReport() {
		
	}

	public ArrayList<BillabilityRow> getOffshore() {
		return offshore;
	}

	public void setOffshore(ArrayList<BillabilityRow> offshore) {
		this.offshore = offshore;
	}

	public ArrayList<BillabilityRow> getOnsite() {
		return onsite;
	}

	public void setOnsite(ArrayList<BillabilityRow> onsite) {
		this.onsite = onsite;
	}



}
