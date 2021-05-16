import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "../../css/layout/Header.css";

const Header = ({ page }) => {
  const [navPage, setNavPage] = useState(page);

  const changePage = (e) => {
    setNavPage(e.target.id);
  };

  const openDropdown = (e) => {
    console.log(e);
  };

  return (
    <div className='header__background one-edge-shadow'>
      <div className='header__main-div container'>
        <div className='header__brand-div'>
          <Link to='/' className='header__link header__brand text-shadow'>
            MU Student Portal
          </Link>
        </div>

        <div className='header__main-nav-div'>
          <Link
            to='/'
            id='header__forum'
            className='header__link header__main-nav'>
            <button
              onClick={changePage}
              id='header__forum'
              className={classNames("", {
                active: navPage === "header__forum",
              })}>
              <div id='header__forum'>
                <i className='fab fa-forumbee'></i>Forum
              </div>
            </button>
          </Link>

          <Link
            to='/library'
            name='library'
            className='header__link header__main-nav'>
            <button
              onClick={changePage}
              id='header__library'
              className={classNames("", {
                active: navPage === "header__library",
              })}>
              <div id='header__library'>
                <i className='fas fa-book-open'></i>Library
              </div>
            </button>
          </Link>

          <Link
            to='/event'
            name='event'
            className='header__link header__main-nav'>
            <button
              onClick={changePage}
              id='header__event'
              className={classNames("", {
                active: navPage === "header__event",
              })}>
              <div id='header__event'>
                <i className='far fa-calendar-alt'></i>Event
              </div>
            </button>
          </Link>
        </div>

        <div className='header__sub-nav-div'>
          <button>
            <Link
              onClick={openDropdown}
              name='notification'
              to='/'
              className='header__link header__sub-nav'>
              <i className='far fa-bell'></i>Notification
            </Link>
          </button>

          <button>
            <Link
              onClick={openDropdown}
              name='temp'
              to='/'
              className='header__link header__sub-nav'>
              <i className='far fa-user'></i>Profile
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
