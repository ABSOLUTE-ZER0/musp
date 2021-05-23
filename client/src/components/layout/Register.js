import "../../css/layout/Register.css";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser, addUserFail } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";
import Alert from "./Alert";
import Footer from "./FooterSmall";


const Registration = ({ addUser, setAlert,addUserFail }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const finalUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    if (user.password !== user.password2) {
      addUserFail("Confirm password does not match", "warning")
      setAlert("Confirm password does not match", "warning");
    } else {
      const res = await addUser(finalUser);
      if (res) {
        addUserFail(res.errors)
        setAlert(res.errors[0].msg, "warning");
      }
    }
  };

  return (
    <div className="register__body">
      <div className='register__main-div'>
      <Alert />
      <div className='register__brand'>
        <i className='fas fa-hands-helping'>
          <p>MUSP</p>
        </i>
      </div>
      <form onSubmit={onSubmit}>
        <h3 className='register__title text-shadow-smooth'>Register</h3>

        <div className='register__input-div'>
          <i className='fas fa-user' />
          <input
            className='register__input'
            type='text'
            name='name'
            onChange={handleInput}
            placeholder='Name'
            value={user.name}
            autoComplete='none'
          />
        </div>

        <div className='register__input-div'>
          <i className='far fa-envelope' />
          <input
            className='register__input'
            type='email'
            name='email'
            onChange={handleInput}
            placeholder='Email'
            value={user.email}
            autoComplete='off'
          />
        </div>

        <div className='register__input-div'>
          <i className='fas fa-lock' />
          <input
            className='register__input'
            type='password'
            name='password'
            onChange={handleInput}
            placeholder='Password'
            value={user.password}
            autoComplete='new-password'
          />
        </div>

        <div className='register__input-div'>
          <i className='fas fa-lock' />
          <input
            className='register__input'
            type='password'
            name='password2'
            onChange={handleInput}
            placeholder='Confirm password'
            value={user.password2}
            autoComplete='new-password'
          />
        </div>

        <button type='submit' className='register__button box-shadow'>
          Register
        </button>
      </form>
    </div>
    <Footer />
    </div>
  );
};

Registration.propTypes = {
  addUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  addUserFail: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addUser, setAlert, addUserFail }
)(Registration);
