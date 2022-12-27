import { useEffect, useState } from "react";
import InterviewDriveService from "../services/InterViewDrive.service";
import DataService from "../services/data.service";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";
import "../css/AllAssociates.css";

const AllAssociates = () => {

    const [allAssociatesData, setAllAssociatesData] = useState([]);
    const [hasAssociates, setHasAssociates] = useState(false);
    const [lobList, setLobList] = useState([]);
    const [serviceLineList, setServiceLineList] = useState([]);
    const [serverError, setServerError] = useState("");
    const [selServiceLine, setSelServiceLine] = useState("");
    const [selLOB, setSelLOB] = useState("");

    useEffect(() => {

        DataService.getLOBList().then(
            (response) => {
                const tempView = [];
                response.forEach((item, index) => {
                    tempView.push({
                        value: item,
                        label: item,
                    });
                });
                setLobList(tempView);
            },
            (error) => {
                const _content =
                    (error.response && error.response) ||
                    error.message ||
                    error.toString();

                setServerError(_content);
            }
        );

        DataService.getAllServiceLine().then(
            (response) => {
                const tempView = [];
                response.forEach((item, index) => {
                    tempView.push({
                        value: item,
                        label: item,
                    });
                });
                setServiceLineList(tempView);
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
        getAssociateData();
    }, [selServiceLine, selLOB]);

    const getAssociateData = () => {
        if (selServiceLine && selServiceLine !== "" && selLOB && selLOB !== "") {
            InterviewDriveService.getAllAssociate(selServiceLine, selLOB)
                .then(data => {
                    console.log(data);
                    setAllAssociatesData(data);
                    setHasAssociates(data.length > 0);
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

    const onChangeServiceList = (e) => {
        setSelServiceLine(e.value);
    };

    const onChangeLOBList = (e) => {
        setSelLOB(e.value);
    };

    const renderTableData = () => {
        return allAssociatesData.map((associate, index) => {

            return (
                <tr key={index} className="associaterow">
                    <td className="tdcentercontent">{index + 1}</td>
                    <td className="tdcentercontent">{associate.associateId}</td>
                    <td className="tdcentercontent">{associate.associateName}</td>
                    <td className="tdcentercontent">{associate.serviceLine}</td>
                    <td className="tdcentercontent">{associate.lOB}</td>
                    <td className="tdcentercontent">{associate.onOff}</td>
                    <td className="tdcentercontent pastdrive">{associate.pastDrives}</td>
                    <td className="tdcentercontent upcomingdrive">{associate.upcomingDrives}</td>
                </tr>

            );
        });
    };

    return (
        <div>
            <div>


                <table className="assignmentdropdown">
                    <tbody>
                        <tr>
                            <td className="tddropdownlabel">
                                <Label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Service Line
                                    : &nbsp;
                                </Label>
                            </td>
                            <td className="tdheaderelements">
                                <FormGroup>
                                    <Select
                                        onChange={onChangeServiceList}
                                        options={serviceLineList}
                                    ></Select>
                                </FormGroup>{" "}
                            </td>
                            <td className="tddropdownlabel">
                                <Label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOB
                                    Reports: &nbsp;
                                </Label>
                            </td>
                            <td className="tdheaderelements">
                                <FormGroup>
                                    <Select
                                        onChange={onChangeLOBList}
                                        options={lobList}
                                    ></Select>
                                </FormGroup>
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
            <label className="formheading">All Associates</label>
            <table width="100%">
                <tbody>
                    <tr>
                        <th key="1">S. No</th>
                        <th key="2">
                            Associate Id
                        </th>
                        <th key="3">
                            Associate Name
                        </th >
                        <th key="4">
                            Service Line
                        </th>
                        <th key="5">
                            Lob
                        </th>
                        <th key="6">
                            Onsite/Offsite
                        </th>
                        <th key="7">
                            Past Drives
                        </th>
                        <th key="8">
                            Upcoming Drives
                        </th>
                    </tr>
                    {renderTableData()}
                </tbody>
            </table>
        </div >
    );
};

export default AllAssociates;

/*
927375	Neeraj, Kumar Thavidaboina	ADM		Offshore
2077598	Siva,Chelapaka	ADM		Offshore
151686	Veeraraghavan, Sridharan	ADM		Onsite
*/