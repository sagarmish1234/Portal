import { useEffect, useRef, useState } from "react";
import Button from "react-validation/build/button";
import DataService from "../services/data.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import CheckButton from "react-validation/build/button";
import InterviewDriveService from "../services/InterViewDrive.service";
import { useNavigate, useParams } from "react-router-dom";
import { UI_URL } from "../common/constants";

import {
    required,
    validEmail,
    validateName,
}
    from "../common/validators";
import AuthService from "../services/auth.service";

const EditPanelistForm = () => {
    const form = useRef();
    const checkBtn = useRef();
    const params = useParams();
    const driveId = params.driveId;
    // const panelistId = params.panelistId;
    const userId = AuthService.getCurrentUser();
    const userFullName = AuthService.getCurrentUserFullName();

    const navigate = useNavigate();

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [skillViews, setSkillViews] = useState([]);
    const [panelistName, setPanelistName] = useState("");
    const [associateId, setAssociateId] = useState("");
    const [panelistEmail, setPanelistEmail] = useState("");
    let [availabilityFrom, setAvailabilityFrom] = useState();
    let [availabilityTo, setAvailabilityTo] = useState();
    const [skillId, setSkillId] = useState(undefined);
    const [driveData, setDriveData] = useState([]);

    // setAssociateId(userId);
    // setPanelistName(userFullName);

    useEffect(() => {
        InterviewDriveService.getInterviewDriveById(driveId).then((data) => {
            setDriveData(data);
        });

        DataService.getAllSkillFamily().then(
            (response) => {
                const skillView = [];
                response.forEach((skill, index) => {
                    skillView.push({
                        value: skill.id,
                        label: skill.skillName,
                    });
                });
                setSkillViews(skillView);
            },
            (error) => {
                const _content =
                    (error.response && error.response) ||
                    error.message ||
                    error.toString();

                setMessage(_content);
            }
        );

        InterviewDriveService.getPenalistByAssociateIdAndDriveId(userId, driveId)
            .then(data => {
                console.log(data);
                setPanelistEmail(data.panelistEmail);
                setAvailabilityFrom(data.availabilityFrom);
                setAvailabilityTo(data.availabilityTo);
            })

    }, []);

    const onChangeAvailabilityFrom = (e) => {
        const vAvailabilityFrom = e.target.value;
        setAvailabilityFrom(vAvailabilityFrom);
    };

    const onChangeAvailabilityTo = (e) => {
        const vAvailabilityTo = e.target.value;
        setAvailabilityTo(vAvailabilityTo);
    };

    const onSkillChange = (event) => {
        setSkillId(event.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        setMessage("");
        setSuccessful(false);
        setIsLoading(true);

        form.current.validateAll();

        if (availabilityFrom.length < 6)
            availabilityFrom = availabilityFrom + ":00";
        if (availabilityTo.length < 6)
            availabilityTo = availabilityTo + ":00";

        if (checkBtn.current.context._errors.length === 0) {
            const panelistObj = {
                panelistName: userFullName,
                associateId: userId,
                // panelistEmail: panelistEmail,
                skillId: skillId,
                availabilityFrom: availabilityFrom,
                availabilityTo: availabilityTo,
                interviewDriveId: driveId,
            };

            // console.log(panelistObj);

            InterviewDriveService.updatePanelist(panelistObj).then(
                (response) => {
                    setSuccessful(true);
                    setIsLoading(false);

                    navigate(UI_URL + `reports/interview/drives`);
                    // window.location.reload();
                },
                (error) => {
                    setSuccessful(false);
                    setMessage(error.message);
                    setIsLoading(false);
                }
            );
        }
    };

    return (
        <div className="col-md-12">
            {isLoading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <></>
            )}
            <div className="card card-container-form">
                <label className="formheading">Edit Panelist details for <i>{driveData.interviewDriveName}</i> dated on <i>({driveData.interviewDriveDate})</i></label>
                <Form onSubmit={onSubmitHandler} ref={form}>
                    {!successful && (
                        <div>
                            <table className="tableform">
                                <tbody>
                                    <tr>
                                        <td className="tableformlabels">
                                            <label htmlFor="panelistName">Panelist Name: </label>
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="panelistName"
                                                value={userFullName}
                                                disabled
                                                validations={[required, validateName]}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tableformlabels">
                                            <label htmlFor="associateId">Associate Id:</label>
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="associateId"
                                                disabled
                                                value={userId}
                                                validations={[required]}
                                            />
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td className="tableformlabels">
                                            <label htmlFor="panelistEmail">Panelist Email: </label>
                                        </td>

                                        <td>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="panelistEmail"
                                                value={panelistEmail}
                                                disabled
                                                validations={[required, validEmail]}
                                            />
                                        </td>
                                    </tr> */}
                                    <tr>
                                        <td className="tableformlabels">
                                            <label htmlFor="skillId">Skill: </label>
                                        </td>
                                        <td>
                                            <Select
                                                onChange={onSkillChange}
                                                options={skillViews}
                                            // validations={[required]}
                                            // defaultValue={skillId}
                                            ></Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tableformlabels">
                                            <label htmlFor="availabilityFrom">
                                                Availability From:{" "}
                                            </label>
                                        </td>

                                        <td>
                                            <Input
                                                type="time"
                                                className="form-control"
                                                name="availabilityFrom"
                                                value={availabilityFrom}
                                                onChange={onChangeAvailabilityFrom}
                                                validations={[required]}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tableformlabels">
                                            <label htmlFor="availabilityTo">Availability To: </label>
                                        </td>

                                        <td>
                                            <Input
                                                type="time"
                                                className="form-control"
                                                name="availabilityTo"
                                                value={availabilityTo}
                                                onChange={onChangeAvailabilityTo}
                                                validations={[required]}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="tableformlabels"></td>
                                        <td>
                                            <Button
                                                className="btn btn-primary btn-block"
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default EditPanelistForm;
