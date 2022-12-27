const gradesReal = [
  undefined,
  "",
  "VP",
  "AVP",
  "SD",
  "D",
  "AD",
  "SM",
  "M",
  "SA",
  "Contractor",
  "A",
  "Associate",
  "Assistant",
  "PA",
  "P",
  "PAT",
  "PT",
];
const gradesMapped = [
  "TBD",
  "TBD",
  "VP",
  "AVP",
  "SD",
  "D",
  "AD",
  "SM",
  "M",
  "SA",
  "CWR",
  "A",
  "A",
  "A",
  "PA",
  "PAT",
  "PAT",
  "PAT",
];

const uniqueGrades = [
  "TBD",
  "VP",
  "AVP",
  "SD",
  "D",
  "AD",
  "SM",
  "M",
  "SA",
  "CWR",
  "A",
  "PA",
  "PAT",
];

const getMappedGrade = (grade) => {
  let idx = gradesReal.indexOf(grade);
  let mappedGrade = gradesMapped[idx];

  return mappedGrade;
};

const getGradePos = (grade) => {
  let idx = gradesReal.indexOf(grade);

  idx = uniqueGrades.indexOf(gradesMapped[idx]);

  if (idx < 10) return "0" + idx;
  else return idx;
};

const getGrade = (pos) => {
  return uniqueGrades[pos];
};

const GradeMapping = {
  getMappedGrade,
  getGradePos,
  getGrade,
};

export default GradeMapping;
