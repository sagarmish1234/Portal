import React, { useState, useRef, useEffect, useMemo } from "react";
import DataService from "../services/data.service";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../css/billabilityreport.css";
import Select from "react-select";
import { BillabilityPlanTable } from "../components/BillabilityPlanTable";
import { sortRows, filterRows, paginateRows } from "../components/helpers";
import { required } from "../common/validators";
import DatePicker from "react-datepicker";
import BillablePlanService from "../services/billabilityplan.service";
import { UI_URL } from "../common/constants";
import { Link } from "react-router-dom";

const BillabilityReport = (props) => {
  const [reportData, setReportData] = useState([]);
  const [practiceList, setPracticeList] = useState([]);
  const [hasRecords, setHasRecords] = useState(false);
  const [serverError, setServerError] = useState("");
  const [selPractice, setSelPractice] = useState("");
  const [billableCategoryViews, setBillableCategoryViews] = useState([]);

  useEffect(() => {
    DataService.getPracticeList().then(
      (response) => {
        const tempView = [];
        response.forEach((item, index) => {
          tempView.push({
            value: item,
            label: item,
          });
        });
        setPracticeList(tempView);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setServerError(_content);
      }
    );

    DataService.getBillableCategories().then(
      (response) => {
        const tempView = new Map();
        response.forEach((category, index) => {
          tempView.set(category.id, category.groupValue);
        });
        setBillableCategoryViews(tempView);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setServerError(_content);
      }
    );
  }, []);

  useEffect(() => {
    getBillabilityReportData();
  }, [selPractice]);

  const onChangePracticeList = (e) => {
    setSelPractice(e.value);
  };

  const getBillabilityReportData = () => {
    if (selPractice && selPractice != "") {
      DataService.getBillabilityReportData(selPractice).then(
        (response) => {
          setReportData(response);
          setHasRecords(response != null);
        },
        (error) => {
          const _content =
            (error.response && error.response) ||
            error.message ||
            error.toString();

          setServerError(_content);
        }
      );
    }
  };

  const renderOffshoreTableData = () => {
    console.log(reportData.onsite);
    reportData.onsite.map((categoryRow, index) => {
      return (
        <tr>
          <td>{categoryRow.catgeory}</td>;<td>{categoryRow.patFte}</td>;
          <td>{categoryRow.paFte}</td>;<td>{categoryRow.associateFte}</td>;
          <td>{categoryRow.seniorAssociateFte}</td>;
          <td>{categoryRow.managerFte}</td>;<td>{categoryRow.smFte}</td>;
          <td>{categoryRow.adFte}</td>;<td>{categoryRow.directorFte}</td>;
          <td>{categoryRow.sdFte}</td>;<td>{categoryRow.avpFte}</td>;
          <td>{categoryRow.vpFte}</td>;<td>{categoryRow.svpFte}</td>;
          <td>{categoryRow.unknownFte}</td>;
        </tr>
      );
    });
  };

  return (
    <div>
      {/* <FormGroup>
        <Label>Name</Label>
        <Input name="name" {...register("name", registerOptions.name)} />
        {errors?.name && errors.name.message}
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          {...register("email", registerOptions.email)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          {...register("password", registerOptions.password)}
        />
     </FormGroup>*/}

      <div>
        <div>
          <table className="assignmentdropdown">
            <tbody>
              <tr>
                <td className="tddropdownlabel">
                  <Label>Practice: &nbsp;</Label>
                </td>
                <td className="tdheaderelements">
                  <FormGroup>
                    <Select
                      onChange={onChangePracticeList}
                      options={practiceList}
                    ></Select>
                  </FormGroup>
                </td>
              </tr>
              <tr width="100%">
                <td>
                  {hasRecords ? (
                    <table
                      cellSpacing="0"
                      cellPadding="5"
                      rules="all"
                      id="tablepyramid"
                    >
                      <tbody>
                        <tr className="gdvheader">
                          <th className="gdvheader" scope="col">
                            Category
                          </th>
                          <th className="gdvheader" scope="col">
                            UNKNOWN
                          </th>
                          <th className="gdvheader" scope="col">
                            SVP
                          </th>
                          <th className="gdvheader" scope="col">
                            VP
                          </th>
                          <th className="gdvheader" scope="col">
                            AVP
                          </th>
                          <th className="gdvheader" scope="col">
                            SD
                          </th>
                          <th className="gdvheader" scope="col">
                            D
                          </th>
                          <th className="gdvheader" scope="col">
                            AD
                          </th>
                          <th className="gdvheader" scope="col">
                            SM
                          </th>
                          <th className="gdvheader" scope="col">
                            M
                          </th>
                          <th className="gdvheader" scope="col">
                            CWR
                          </th>
                          <th className="gdvheader" scope="col">
                            SA
                          </th>
                          <th className="gdvheader" scope="col">
                            A
                          </th>
                          <th className="gdvheader" scope="col">
                            PA
                          </th>
                          <th className="gdvheader" scope="col">
                            PAT
                          </th>
                        </tr>
                        <tr>
                          <td colSpan={15} className="gridviewcontentname">
                            <div>Onsite</div>
                          </td>
                        </tr>

                        {reportData.onsite.map((categoryRow, index) => {
                          return (
                            <>
                              <tr>
                                <td className="gridviewcontentnameleft">
                                  <div>
                                    {" "}
                                    {billableCategoryViews.get(
                                      categoryRow.category
                                    )}
                                  </div>
                                </td>
                                <td className="gridviewcontentno">
                                  <div> {categoryRow.unknownFte}</div>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/SVP" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.svpFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/VP" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.vpFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/AVP" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.avpFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/SD" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.sdFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/D" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.directorFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/AD" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.adFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/SM" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.smFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/M" +
                                      "/Onsite"
                                    }
                                  >
                                    {" "}
                                    {categoryRow.managerFte}{" "}
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/CWR" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.cwrFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/SA" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.seniorAssociateFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/A" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.associateFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/PA" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.paFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      selPractice +
                                      "/" +
                                      categoryRow.category +
                                      "/PAT" +
                                      "/Onsite"
                                    }
                                  >
                                    <div> {categoryRow.patFte}</div>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <tr>
                          <td colSpan={15} className="gridviewcontentname">
                            <div>Offshore</div>
                          </td>
                        </tr>
                        {reportData.offshore.map((categoryRow, index) => {
                          return (
                            <>
                              <tr>
                                <td className="gridviewcontentnameleft">
                                  <div>
                                    {" "}
                                    {billableCategoryViews.get(
                                      categoryRow.category
                                    )}
                                  </div>
                                </td>
                                <td className="gridviewcontentno">
                                  <div>
                                    <Link
                                      to={
                                        UI_URL +
                                        "forms/billability/filteredbillableplans/" +
                                        categoryRow.category +
                                        "/UNKNOWN" +
                                        "/Offshore"
                                      }
                                    >
                                      {categoryRow.unknownFte}{" "}
                                    </Link>
                                  </div>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/SVP" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.svpFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/VP" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.vpFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/AVP" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.avpFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/SD" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.sdFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/D" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.directorFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/AD" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.adFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/SM" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.smFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/M" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.managerFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/CWR" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.cwrFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/SA" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.seniorAssociateFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/A" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.associateFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/PA" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.paFte}</div>
                                  </Link>
                                </td>
                                <td className="gridviewcontentno">
                                  <Link
                                    to={
                                      UI_URL +
                                      "forms/billability/filteredbillableplans/" +
                                      categoryRow.category +
                                      "/PAT" +
                                      "/Offshore"
                                    }
                                  >
                                    <div> {categoryRow.patFte}</div>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillabilityReport;
