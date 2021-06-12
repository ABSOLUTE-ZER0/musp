import React, { useState } from "react";
import "../../../css/auth/ForgotPasswordRequest.css";
import Header from "../../layout/Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alertActions";
import { forgotPassword } from "../../../actions/authActions";
import Alert from "../../layout/Alert";

const ForgotPasswordRequest = ({ forgotPassword, setAlert }) => {
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    const res = await forgotPassword(email);

    if (res.errors) {
      setAlert(res.errors[0].msg, "warning");
    }
    if (res.data && res.data.msg === "mail sent!") {
      setAlert("Check your email for the password reset link!", "success");
    }
  };

  return (
    <div className='fprequest__main'>
      <Header />
      <div className='container fprequest__main-div'>
        <div className='alert-div'>
          <Alert />
        </div>
        <i className='fa fa-lock fa-4x'></i>
        <h2 className='fprequest__title'>Forgot Password?</h2>
        <p>You can reset your password here.</p>
        <div className='fprequest__input-div'>
          <input
            name='email'
            value={email}
            onChange={async (e) => await setEmail(e.target.value)}
            placeholder='email address'
            type='email'></input>
          <button
            onClick={onSubmit}
            name='recover-submit'
            className='btn btn-lg btn-primary btn-block'
            type='submit'>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

ForgotPasswordRequest.propTypes = {
  setAlert: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, forgotPassword })(
  ForgotPasswordRequest
);
