package com.example.myjwt.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import org.springframework.security.access.prepost.PreAuthorize;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.myjwt.beans.AsgnmtAssociate;
import com.example.myjwt.beans.BillabilityRow;
import com.example.myjwt.beans.BillablePlanData;
import com.example.myjwt.beans.BillableReport;
import com.example.myjwt.beans.Mapping;
import com.example.myjwt.controllers.base.BaseController;
import com.example.myjwt.exception.BadRequestException;
import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;
import com.example.myjwt.models.BillablePlan;
import com.example.myjwt.models.Category;
import com.example.myjwt.models.enm.EGrade;
import com.example.myjwt.payload.PyramidItem;
import com.example.myjwt.repo.AssignmentReportRepository;
import com.example.myjwt.repo.AssignmentUserRepository;
import com.example.myjwt.repo.BillablePlanRepository;
import com.example.myjwt.repo.CategoryRepository;
import com.example.myjwt.util.AppConstants;

@RestController
@RequestMapping("/api")
public class ReportController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

	public static final int GETPYRAMIDBYSERVICELINE = 1;

	@Autowired
	private AssignmentUserRepository assignmentUserRepository;

	@Autowired
	private AssignmentReportRepository assignmentReportRepository;

	@Autowired
	private BillablePlanRepository billablePlanRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@GetMapping("/stat/getReportData/{serviceLine}")
	public List<PyramidItem> getReportData(@RequestParam(value = "reportID") int reportID,
			@RequestParam(value = "paramId") String paramId , @PathVariable String serviceLine) {

		Long currentUserId = getCurrentUserId();

		System.out.println("paramId=========================" + paramId);
        System.out.println(serviceLine);
		int pid = Integer.parseInt(paramId);

		List<AssignmentUser> asgnmtAssociateList = assignmentUserRepository.findAll();

		for (int i = asgnmtAssociateList.size() - 1; i >= 0; i--) {
			AssignmentUser au = asgnmtAssociateList.get(i);
			if (au.getAssignmentReport().getId() != pid) {
				asgnmtAssociateList.remove(i);
			}
		}

		System.out.println("asgnmtAssociateList.size()=========================" + asgnmtAssociateList.size());

		HashMap<EGrade, PyramidItem> reportData = null;

		ArrayList<PyramidItem> reportDataList = new ArrayList<PyramidItem>();

		switch (reportID) {
		case GETPYRAMIDBYSERVICELINE:
			reportData = getPyramidByServiceLine(serviceLine, asgnmtAssociateList);

			reportDataList = new ArrayList(reportData.values());

			Collections.sort(reportDataList, PyramidItem.PyramidItemOnGrade);

			break;
		}

		return reportDataList;
	}

	public HashMap<EGrade, PyramidItem> getPyramidByServiceLine(String serviceLine,
			List<AssignmentUser> asgnmtAssociateList) {
		HashMap<EGrade, PyramidItem> reportData = new HashMap<EGrade, PyramidItem>();

		for (AssignmentUser assignmentUser : asgnmtAssociateList) {

			if (assignmentUser.getServiceLine().equalsIgnoreCase(serviceLine)) {
				EGrade grade = Mapping.getMappedGrade(assignmentUser.getGradeDescription());

				PyramidItem pyramidItem = reportData.get(grade);

				if (pyramidItem == null) {
					pyramidItem = new PyramidItem();
					pyramidItem.setGrade(grade);
					reportData.put(grade, pyramidItem);
				}
				pyramidItem.addToExisting(assignmentUser);
			}

		}
		return reportData;
	}

	public void nativeQueryToAsgnmtAssociate(Object[] arrValues) {

		AsgnmtAssociate asgnmtAssociate = new AsgnmtAssociate(arrValues);
		// return asgnmtAssociate;

	}

	private ArrayList<BillabilityRow> fillBillableObject(HashMap<Long, HashMap<String, Double>> locationMap) {
		ArrayList<BillabilityRow> list = new ArrayList<BillabilityRow>();
		for (Entry<Long, HashMap<String, Double>> categoryMap : locationMap.entrySet()) {

			BillabilityRow row = new BillabilityRow();
			row.setCategory(categoryMap.getKey());
			list.add(row);

			HashMap<String, Double> mapGradeMap = categoryMap.getValue();

			for (Entry<String, Double> entry : mapGradeMap.entrySet()) {

				switch (entry.getKey()) {
				case "PAT":
					row.setPatFte(entry.getValue());
					break;
				case "PA":
					row.setPaFte(entry.getValue());
					break;
				case "A":
					row.setAssociateFte(entry.getValue());
					break;
				case "SA":
					row.setSeniorAssociateFte(entry.getValue());
					break;
				case "CWR":
					row.setCwrFte(entry.getValue());
					break;
				case "M":
					row.setManagerFte(entry.getValue());
					break;
				case "SM":
					row.setSmFte(entry.getValue());
					break;
				case "AD":
					row.setAdFte(entry.getValue());
					break;
				case "D":
					row.setDirectorFte(entry.getValue());
					break;
				case "SD":
					row.setSdFte(entry.getValue());
					break;
				case "AVP":
					row.setAvpFte(entry.getValue());
					break;
				case "VP":
					row.setVpFte(entry.getValue());
					break;
				case "SVP":
					row.setSvpFte(entry.getValue());
					break;
				case "UNKNOWN":
					row.setUnknownFte(entry.getValue());
					break;
				}
			}

		}
		return list;
	}

	@GetMapping("/report/apiGetBillableReport")
	public BillableReport apiGetBillableReport(@RequestParam(value = "selPractice") String selPractice) {

		System.out.println("I am here: apiGetBillableReport");

		BillableReport billableReport = new BillableReport();

		AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc()
				.orElseThrow(() -> new BadRequestException("No assignment report found"));

		List<AssignmentUser> allAssociates = assignmentUserRepository.findByAssignmentReportAndServiceLine(report,
				selPractice);

		List<BillablePlan> billableAllPlans = billablePlanRepository.findAllByOrderByIdDesc();

		HashMap<Long, BillablePlan> mapAssociateBillablePlans = new HashMap<Long, BillablePlan>();

		for (BillablePlan plan : billableAllPlans) {
			BillablePlan tempPlan = mapAssociateBillablePlans.get(plan.getAssociateId());
			if (tempPlan == null) {
				// System.out.println("Plan not found---------------------------------adding
				// it-:"+plan.getAssociateId()+" ----- :"+plan.getBillableCategory().getId());
				mapAssociateBillablePlans.put(plan.getAssociateId(), plan);
			} else if (plan.getAssociateId() == 137427 || plan.getAssociateId() == 172275) {
				// System.out.println("Plan
				// found----------------------------------:"+plan.getBillableCategory().getId());
			}
		}

		HashMap<Long, HashMap<String, Double>> onsiteMap = new HashMap<Long, HashMap<String, Double>>();
		HashMap<Long, HashMap<String, Double>> offshoreMap = new HashMap<Long, HashMap<String, Double>>();

		for (AssignmentUser user : allAssociates) {
			BillablePlan plan = mapAssociateBillablePlans.get(user.getAssociateID());
			String mappedGrade = Mapping.getMappedGrade(user.getGradeDescription()).name();

			HashMap<Long, HashMap<String, Double>> targetMap;

			if (user.getOnOff().equals(AppConstants.ONSITE)) {
				targetMap = onsiteMap;
			} else {
				targetMap = offshoreMap;
			}

			Category noPlanCategory = categoryRepository.findByCatGroupAndGroupKeyAndGroupValue(
					AppConstants.CATEGORY_BILLABILITY, AppConstants.CATEGORY_BILLABILITY,
					AppConstants.NO_BILLABILITY_PLAN);

			HashMap<String, Double> mapPlanGrade;
			Long planCategoryId;
			if (plan == null) {
				planCategoryId = noPlanCategory.getId();

			} else {
				planCategoryId = plan.getBillableCategory().getId();
			}

			mapPlanGrade = targetMap.get(planCategoryId);

			if (mapPlanGrade == null) {
				mapPlanGrade = new HashMap<String, Double>();
				mapPlanGrade.put(mappedGrade, user.getfTE());
				targetMap.put(planCategoryId, mapPlanGrade);
			} else {
				Double fte = mapPlanGrade.get(mappedGrade);
				if (fte == null)
					fte = 0.0;
				fte = fte + user.getfTE();
				mapPlanGrade.put(mappedGrade, fte);
			}
		}

		billableReport.setOnsite(fillBillableObject(onsiteMap));
		billableReport.setOffshore(fillBillableObject(offshoreMap));

		return billableReport;
	}

	

}