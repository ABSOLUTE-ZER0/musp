import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alertActions";
import { logout } from "../../../actions/authActions";
import Alert from "../../layout/Alert";

import "../../../css/auth/Verify.css";
import Header from "../../layout/Header";
import API from "../../../api";


const token = localStorage.getItem("token");


const Verify = ({  setAlert, logout }) => {


  const resend = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    const res = await API.post("/api/user/verify", null, config);

    if (res.data.errors) {
      setAlert(res.data.errors[0].msg, "warning");
    }
  };



  return (
    <div> 
    <Header page="none" />
    <div className='verify__main-div container'>
      <Alert />
    <h1 className='verify__title'>Email verification</h1>
    <div className='verify__sub-div'>
      <div className='verify__text-div'>
        <p className='verify__sub'>
          Thank you for signing up for MU Student Portal
        </p>
        <p className='verify__sub'>
          To start using the app please verify your email by clicking on the
          link sent to your email.
        </p>
        <div className='verify__image-div'></div>
      </div>
      <div>
        <p className='verify__resend-text'>
          Click on the button below to re-send the verification email
        </p>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <button className='verify__resend-button' onClick={resend}>
          VERIFY EMAIL
        </button>
        <p style={{marginTop: "2rem"}} className='verify__resend-text'>
          Login with another email!
        </p>
        <button className='verify__logout-button' onClick={() => logout()}>
          LOGOUT
        </button>
      </div>
    </div>
  </div>
  </div>
    
  );
};

Verify.propTypes = {
  setAlert: PropTypes.func.isRequired,
};



export default connect(null, { setAlert, logout })(Verify);
