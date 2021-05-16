import React, { useState } from "react";
import Login from "../../layout/Login"
import Register from "../../layout/Register"

import classNames from 'classnames'

import "../../../css/auth/Auth.css";

const Auth = () => {

  const [page, setPage] = useState('login')

  const changePage = (e) => {
    setPage(e.target.name)
  }

  return (
    <div className='auth__main-div'>
      <div className='auth__background'>
        <h1 className='auth__welcometext'>Welcome to</h1>
        <p className='auth__brand-name text-shadow'>MU Student Portal</p>
        <p className='auth__brand-text'>
          The one place where all your queries are answered
        </p>
        <div className='auth__routes'>
          <button className="auth__button menu-button">MENU</button>
          <button className={classNames('auth__button', {"active" : page === 'login'})} name='login' onClick={changePage}>Login</button>
          <button className={classNames('auth__button', {"active" : page === 'register'})} name='register' onClick={changePage}>Register</button>
        </div>
      </div>
      <div className="auth__conditional-page">
        { page === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;
