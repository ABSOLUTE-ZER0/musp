import React, { useState } from "react";
import "../../../css/auth/ForgotPasswordResponce.css";
import Header from "../../layout/Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alertActions";
import { resetPassword } from "../../../actions/authActions";
import Alert from "../../layout/Alert";
import { useParams } from "react-router";

const ForgotPasswordResponce = ({ resetPassword, setAlert }) => {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const { id } = useParams();
  const onSubmit = async () => {
    if (password !== password1) {
      setAlert("Confirm password doesn't match!", "warning");
    }
    const res = await resetPassword(id,password);

    if (res.errors) {
      setAlert(res.errors[0].msg, "warning");
    }
    if (res.data && res.data === "password changed!") {
      setAlert("Password changed!", "success");
    }
  };

  return (
    <div className='fprequest__main'>
      <Header />
      <div class='container fprequest__main-div'>
        <div className='alert-div'>
          <Alert />
        </div>
        <i class='fa fa-lock fa-4x'></i>
        <h2 class='fprequest__title'>Reset Password?</h2>
        <p>You can reset your password here.</p>
        <div class='fprequest__input-div'>
          <input
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type='password'></input>
          <input
            name='password1'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder='Confirm Password'
            type='password'></input>
          <button
            onClick={onSubmit}
            name='recover-submit'
            class='btn btn-lg btn-primary btn-block'
            type='submit'>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

ForgotPasswordResponce.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, resetPassword })(
  ForgotPasswordResponce
);
