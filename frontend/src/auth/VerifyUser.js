// import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../common/constants";

// import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const VerifyUser = () => {
  // let [searchParams, setSearchParams] = useSearchParams();
  // const code = searchParams.get("code");
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);

  const navigate = useNavigate();

  AuthService.verifyUser(code).then(
    (response) => {
      console.log(response);
      //   navigate("/ui/login");
      //   window.location.reload();
      window.location.href = "/#/ui/login";
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      //   setLoading(false);
      //   setMessage(resMessage);
    }
  );

  return (
    <>
      <br />
      <br />
      <br />
      <div class="spinner-border" role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
    </>
  );
};

export default VerifyUser;
