import { isEmail } from "validator";

// /\S+@\S+\.\S+/
export const emailValidator = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/^[a-z0-9_.#$]+@outlook.com+$/).test(email)) {
    return (
      <div className="invalid-feedback d-block">
        This is invalid email format
      </div>
    );
  }
  return "";
};

export const idValidator = (cognizantId) => {
  if (!new RegExp(/^[0-9]+$/).test(cognizantId)) {
    return (
      <div className="invalid-feedback d-block">
        This Field must be in digits
      </div>
    );
  } else if (!(cognizantId.length > 5 && cognizantId.length < 10)) {
    return (
      <div className="invalid-feedback d-block">
        This Field must be between 5 to 10 digits
      </div>
    );
  }
  return "";
};

export const validateId = (cognizantId) => {
  if (!new RegExp(/^[0-9]+$/).test(cognizantId)) {
    return (
      <div className="invalid-feedback d-block">
        This Field must be in digits
      </div>
    );
  } else if (!(cognizantId.length > 5 && cognizantId.length < 10)) {
    return (
      <div className="invalid-feedback d-block">
        This Field must be between 5 to 10 digits
      </div>
    );
  }
  return "";
};

export const OTPValidator = (otp) => {
  if (!new RegExp(/^[0-9]+$/).test(otp)) {
    return (
      <div className="invalid-feedback d-block">
        This Field must be in digits
      </div>
    );
  } else if (otp.length !== 6) {
    return (
      <div className="invalid-feedback d-block">
        This Field must be in 6 digits
      </div>
    );
  }
  return "";
};

export const passwordValidator = (password) => {
  if (
    !new RegExp(
      /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-_+.]){1,}).{8,}$/
    ).test(password)
  ) {
    return (
      <div className="invalid-feedback d-block">
        Password must be have at least 8 characters long, contain at least one
        special character and one number and have a mixture of uppercase and
        lowercase letters.
      </div>
    );
  }
  // else if (password.length < 8) {
  //   return (<div className="invalid-feedback d-block">Password must have a minimum 8 characters</div>);
  // }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  // if (!confirmPassword) {
  //   return "Confirm password is required";
  // } else if (confirmPassword.length < 8) {
  //   return "Confirm password must have a minimum 8 characters";
  // } else
  if (confirmPassword === form.password) {
    return (
      <div className="invalid-feedback d-block">Passwords do not match</div>
    );
  }
  return "";
};

export const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

export const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">This is not a valid email.</div>
    );
  }
};

export const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

export const validateName = (value) => {
  if (value.length < 5 || value.length > 80) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 5 and 80 characters.
      </div>
    );
  }
};

export const validateDescription = (value) => {
  if (value.length < 5 || value.length > 200) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 5 and 200 characters.
      </div>
    );
  }
};

export const validatePhone = (value) => {
  if (isNaN(value)) {
    return (
      <div className="invalid-feedback d-block">
        The mobile number must be integer.
      </div>
    );
  }
  if (value.length < 5 || value.length > 80) {
    return (
      <div className="invalid-feedback d-block">
        The mobile number must be between 5 and 80 characters.
      </div>
    );
  }
};

export const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export const validateNumber = (value) => {
  if (value.trim() === "") {
    return <div className="invalid-feedback d-block">Not a valid number!</div>;
  }

  if (isNaN(value)) {
    return <div className="invalid-feedback d-block">Not a valid number!</div>;
  }
};

export const isNumber = (value) => {
  if (value.trim() === "") {
    return false;
  }

  return !isNaN(value);
};

export const isPositive = (value) => {
  if (isNumber(value) && value > 0) {
    return true;
  }
};

export const validatePositiveNumber = (value) => {
  if (!isPositive(value)) {
    return (
      <div className="invalid-feedback d-block">
        Not a valid postive number!
      </div>
    );
  }
};

export const validatePercentage = (value) => {
  if (!isPositive(value) || value > 100) {
    return (
      <div className="invalid-feedback d-block">Not a valid percentage!</div>
    );
  }
};
