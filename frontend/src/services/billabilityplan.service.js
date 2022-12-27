import { apiAddBillabilityPlan } from "../utils/AppUtils";

const addBillabilityPlan = (objBillabilityPlan) => {
  return apiAddBillabilityPlan(objBillabilityPlan);
};

const BillablePlanService = {
  addBillabilityPlan,
};

export default BillablePlanService;
