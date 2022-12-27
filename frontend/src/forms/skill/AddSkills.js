import React, { useState, useRef, useEffect, useCallback } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import "../../css/tableforms.css";
import "../../css/spinner.css";
import "../../css/skilltrackers.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SkillService from "../../services/skill.service";
import Select from "react-select";
import Input from "react-validation/build/input";

const AddSkills = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [isLoading, setIsLoading] = useState(false);

  //default values
  const [skillFamilies, setSkillFamilies] = useState([]);
  const [skillProficiencies, setSkillProficiencies] = useState([]);
  const [certificateFamilies, setCertificateFamilies] = useState([]);
  const [skillFamiliesMap, setSkillFamiliesMap] = useState(new Map());
  const [skillCategoriesMap, setSkillCategoriesMap] = useState(new Map());
  const [proficiencyMap, setProficiencyMap] = useState(new Map());
  const [certificateFamiliesMap, setCertificateFamiliesMap] = useState(
    new Map()
  );

  //selected value
  const [ctsStartDate, setCtsStartDate] = useState(new Date());
  const [itStartDate, setItStartDate] = useState(new Date());

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [skillCategories, setSkillCategories] = useState([]);
  const [skillDefaultCategories, setSkillDefaultCategories] = useState([]);

  //Screen parameters
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  //paramter to just update the UI
  const [dummyToUpdateUI, setDummyToUpdateUI] = useState([]);

  useEffect(() => {
    SkillService.getAllSkillCategories().then(
      (response) => {
        skillCategoriesMap.clear();
        response.forEach((item, index) => {
          let dropdownItem = {
            value: item.id,
            label: item.skillCategory,
          };

          if (skillCategoriesMap.get(item.skillfamily.id)) {
            let tempMap = skillCategoriesMap.get(item.skillfamily.id);
            tempMap.set(item.id, dropdownItem);
            skillCategoriesMap.set(item.skillfamily.id, tempMap);
          } else {
            let tempMap = new Map();
            tempMap.set(item.id, dropdownItem);
            skillCategoriesMap.set(item.skillfamily.id, tempMap);
          }
        });
        setSkillCategoriesMap(skillCategoriesMap);
        updateUI();
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setMessage(_content);
      }
    );

    SkillService.getAllSkillFamilies().then(
      (response) => {
        const skillFamilyView = [];
        skillFamiliesMap.clear();
        response.forEach((item, index) => {
          let dropdownItem = {
            value: item.id,
            label: item.skillFamily,
          };

          skillFamilyView.push(dropdownItem);
          skillFamiliesMap.set(item.id, dropdownItem);
        });
        setSkillFamilies(skillFamilyView);
        updateUI();
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setMessage(_content);
      }
    );

    SkillService.getAllSkillProficiencies().then(
      (response) => {
        const skillProficiencyView = [];
        let dropdownItem = [];
        proficiencyMap.clear();
        response.forEach((item, index) => {
          dropdownItem = {
            value: item.id,
            label: item.groupValue,
          };
          skillProficiencyView.push(dropdownItem);
          proficiencyMap.set(item.id, dropdownItem);
        });
        setSkillProficiencies(skillProficiencyView);
        updateUI();
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setMessage(_content);
      }
    );

    SkillService.getAllCertificationFamilies().then(
      (response) => {
        const certificationFamilyView = [];
        certificateFamiliesMap.clear();
        response.forEach((item, index) => {
          let dropdownItem = [];

          dropdownItem = {
            value: item.id,
            label: item.certificateFamilyName,
          };

          certificationFamilyView.push(dropdownItem);
          certificateFamiliesMap.set(item.id, dropdownItem);
        });
        setCertificateFamilies(certificationFamilyView);
        setCertificateFamiliesMap(certificateFamiliesMap);
        updateUI();
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setMessage(_content);
      }
    );

    SkillService.getMySkillProfile().then(
      (response) => {
        setItStartDate(response.itJoiningDate);
        setCtsStartDate(response.ctsJoiningDate);

        response.associateSkill.forEach((item, index) => {
          let skillCatMapLocal = skillCategoriesMap.get(
            item.skillCategory.skillfamily.id
          );

          skillDefaultCategories[index] = skillCatMapLocal.get(
            item.skillCategory.id
          );

          selectedSkills.push({
            skillFamilyId: item.skillCategory.skillfamily.id,
            skillCategoryId: item.skillCategory.id,
            skillProficiencyId: item.skillProficiency.id,
            showSymbol: true,
          });

          skillCategories[index] = Array.from(skillCatMapLocal.values());
          setSkillCategories(skillCategories);
        });

        response.associateCertificate.forEach((item, index) => {
          selectedCertifications.push({
            certificationFamilyId: item.certificateFamily.id,
            certificationName: item.certificateName,
            certificationDate: item.certificationDate,
            isExternal: !item.isInternal,
            showSymbol: true,
          });
        });

        addBlankSkillRow();
        addBlankCertificationRow();
        updateUI();
      },
      (error) => {
        addBlankSkillRow();
        addBlankCertificationRow();
      }
    );
  }, []);

  const addBlankSkillRow = () => {
    setSelectedSkills([
      ...selectedSkills,
      {
        skillFamilyId: -1,
        skillCategoryId: -1,
        skillProficiencyId: -1,
        showSymbol: true,
        categories: "",
      },
    ]);
  };

  const addBlankCertificationRow = () => {
    setSelectedCertifications([
      ...selectedCertifications,
      {
        certificationFamilyId: -1,
        certificationName: undefined,
        certificationDate: undefined,
        isExternal: false,
        showSymbol: true,
      },
    ]);
  };

  const onSkillFamilyChange = (event, index) => {
    selectedSkills[index].skillFamilyId = event.value;
    selectedSkills[index].skillCategoryId = -1;

    setSelectedSkills(selectedSkills);

    let skillCatMapLocal = skillCategoriesMap.get(event.value);
    skillCategories[index] = Array.from(skillCatMapLocal.values());
    setSkillCategories(skillCategories);

    skillDefaultCategories[index] = { value: "", label: "" };
    setSkillDefaultCategories(skillDefaultCategories);

    updateUI();
  };

  const updateUI = () => {
    const newBought = [...dummyToUpdateUI, 1];
    setDummyToUpdateUI(newBought);
  };

  const onSkillCategoryChange = (event, index) => {
    selectedSkills[index].skillCategoryId = event.value;
  };

  const onProficiencyChange = (event, index) => {
    selectedSkills[index].skillProficiencyId = event.value;
  };

  const onCertificateFamilyChange = (event, index) => {
    selectedCertifications[index].certificationFamilyId = event.value;
  };

  const onCertificateNameChange = (event, index) => {
    selectedCertifications[index].certificationName = event.target.value;
  };

  const onCertificateDateChange = (event, index) => {
    selectedCertifications[index].certificationDate = event.target.value;
  };

  const onCertificateTypeChange = (event, index) => {
    var isChecked = event.target.checked;
    selectedCertifications[index].isExternal = isChecked;
  };

  const onChangeCtsStartDate = (event) => {
    setCtsStartDate(event.target.value);
  };

  const onChangeItStartDate = (event) => {
    setItStartDate(event.target.value);
  };

  const addNewSkillRow = (index) => (e) => {
    e.preventDefault();
    if (selectedSkills[index].skillFamilyId == -1) return;
    if (selectedSkills[index].skillCategoryId == -1) return;
    if (selectedSkills[index].skillProficiencyId == -1) return;
    addBlankSkillRow();
  };

  const addNewCerificateRow = (index) => (e) => {
    e.preventDefault();
    if (selectedCertifications[index].certificationFamilyId == -1) return;
    addBlankCertificationRow();
  };

  const deleteSkillRow = (index) => (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (selectedSkills.length == 1) return;
    let data = [...selectedSkills];
    data = data.filter(
      (skill) => skill.skillCategoryId != data[index].skillCategoryId
    );
    setSelectedSkills(data);
  };

  const deleteCertificateRow = (index) => (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (selectedCertifications.length == 1) return;
    let data = [...selectedCertifications];
    data = data.filter(
      (certificate) =>
        certificate.certificationFamilyId != data[index].certificationFamilyId
    );
    setSelectedCertifications(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const associateSkillProfile = {
        ctsJoiningDate: ctsStartDate,
        itJoiningDate: itStartDate,
        associateSkill: selectedSkills,
        associateCertificate: selectedCertifications,
      };

      SkillService.saveAssociateSkillProfile(associateSkillProfile)
        .then((response) => {
          setSuccessful(true);
          setMessage("Saved Successfully");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="col-md-15">
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <></>
      )}
      <div className="card card-container-form">
        <label className="formsheading">Skill Tracker</label>
        <Form onSubmit={(event) => handleSubmit(event)} ref={form}>
          {
            <div>
              <table className="tableform">
                <tbody>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="experience">Cognizant Start Date: </label>
                    </td>

                    <td>
                      <Input
                        type="date"
                        className="form-control"
                        value={ctsStartDate}
                        onChange={(e) => onChangeCtsStartDate(e)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="experienceIt">
                        IT Career Start Date:{" "}
                      </label>{" "}
                    </td>
                    <td>
                      <Input
                        type="date"
                        className="form-control"
                        value={itStartDate}
                        onChange={(e) => onChangeItStartDate(e)}
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <hr></hr>
                    </td>
                    <td>
                      <hr></hr>
                    </td>
                  </tr>

                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="skillId">Skills: </label>
                    </td>
                    <td>
                      <div className="allskills">
                        <table>
                          <tbody>
                            <tr>
                              <th>Family</th>
                              <th>Category</th>
                              <th>Proficiency</th>
                            </tr>

                            {selectedSkills.map((skill, index) => {
                              let skillCatMapLocal = skillCategoriesMap.get(
                                selectedSkills[index].skillFamilyId
                              );

                              return (
                                <tr key={index}>
                                  <td>
                                    <Select
                                      onChange={(e) =>
                                        onSkillFamilyChange(e, index)
                                      }
                                      options={skillFamilies}
                                      defaultValue={skillFamiliesMap.get(
                                        selectedSkills[index].skillFamilyId
                                      )}
                                      required
                                    ></Select>
                                  </td>

                                  <td>
                                    <Select
                                      id={"skillcategory" + index}
                                      name={"skillcategory" + index}
                                      onChange={(e) =>
                                        onSkillCategoryChange(e, index)
                                      }
                                      options={skillCategories[index]}
                                      defaultValue={
                                        skillDefaultCategories[index]
                                      }
                                      xyz={dummyToUpdateUI}
                                    ></Select>
                                  </td>
                                  <td>
                                    <Select
                                      onChange={(e) =>
                                        onProficiencyChange(e, index)
                                      }
                                      options={skillProficiencies}
                                      defaultValue={proficiencyMap.get(
                                        selectedSkills[index].skillProficiencyId
                                      )}
                                    ></Select>
                                  </td>
                                  <td>
                                    <span
                                      hidden={!skill.showSymbol}
                                      className="gap"
                                    >
                                      <button onClick={addNewSkillRow(index)}>
                                        {" "}
                                        +{" "}
                                      </button>
                                      <button
                                        onClick={deleteSkillRow(index)}
                                        className="gap1"
                                      >
                                        {" "}
                                        -{" "}
                                      </button>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <hr></hr>
                    </td>
                    <td>
                      <hr></hr>
                    </td>
                  </tr>

                  <tr>
                    <td className="tableformlabels">
                      <label htmlFor="selectedFile">Certifications: </label>
                    </td>
                    <td>
                      <div className="allskills">
                        <table>
                          <tbody>
                            <tr>
                              <th>Family</th>
                              <th>Name</th>
                              <th>Date</th>
                              <th>External?</th>
                            </tr>
                            {selectedCertifications.map((cer, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <Select
                                      onChange={(e) =>
                                        onCertificateFamilyChange(e, index)
                                      }
                                      options={certificateFamilies}
                                      defaultValue={certificateFamiliesMap.get(
                                        cer.certificationFamilyId
                                      )}
                                      key={certificateFamiliesMap.get(
                                        cer.certificationFamilyId
                                      )}
                                      xyz={dummyToUpdateUI}
                                    ></Select>
                                  </td>
                                  <td>
                                    <Input
                                      type="text"
                                      className="form-control-text"
                                      value={cer.certificationName}
                                      onChange={(e) =>
                                        onCertificateNameChange(e, index)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <Input
                                      type="date"
                                      className="form-control"
                                      value={cer.certificationDate}
                                      onChange={(e) =>
                                        onCertificateDateChange(e, index)
                                      }
                                    />
                                  </td>
                                  <td className="form-control-checkbox">
                                    <Input
                                      type="checkbox"
                                      checked={cer.isExternal}
                                      onChange={(e) =>
                                        onCertificateTypeChange(e, index)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <span className="gap">
                                      <button
                                        onClick={addNewCerificateRow(index)}
                                      >
                                        {" "}
                                        +{" "}
                                      </button>
                                      <button
                                        onClick={deleteCertificateRow(index)}
                                        className="gap1"
                                      >
                                        {" "}
                                        -{" "}
                                      </button>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="tableformlabels"></td>
                    <td className="last">
                      <input
                        className="btn btn-primary btn-block"
                        type="submit"
                        name="submit"
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }

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

export default AddSkills;
