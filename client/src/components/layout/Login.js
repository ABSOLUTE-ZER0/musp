import "../../css/layout/Login.css";

import { Link } from "react-router-dom";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, loginFail } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";
import Alert from "./Alert";
import Footer from "./FooterSmall";

const Login = ({ loginUser, setAlert, loginFail }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(user);
    if (res && res.errors) {
      setAlert(res.errors[0].msg, "warning");
      loginFail(res.errors[0].msg);
    }
  };

  return (
    <div className="login__body">
      <div className='login__main-div'>
        <Alert />
        <div className='login__brand'>
          <i className='fas fa-hands-helping'>
            <p>MUSP</p>
          </i>
        </div>
        <input type='hidden' value='something' />
        <form>
          <h3 className='login__title text-shadow-smooth'>Login</h3>

          <div className='login__input-div'>
            <i className='far fa-envelope' />
            <input
              className='login__input'
              type='email'
              name='email'
              autoFocus
              onChange={handleInput}
              placeholder='Email'
              value={user.email}
              autoComplete='off'
            />
          </div>

          <div className='login__input-div'>
            <i className='fas fa-lock' />
            <input
              className='login__input'
              type='password'
              name='password'
              onChange={handleInput}
              placeholder='Password'
              value={user.password}
              autoComplete='new-password'
            />
          </div>

          <button
            onClick={onSubmit}
            type='submit'
            className='login__button box-shadow'>
            Login
          </button>
          <span className='login__forgot'>
            <Link to={`/login/forgot`}>Forgot Password ?</Link>
          </span>
        </form>
      </div>
      <Footer />
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  loginFail: PropTypes.func.isRequired,
};

export default connect(null, { loginUser, setAlert, loginFail })(Login);
