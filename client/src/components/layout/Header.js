import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Dropdown } from "react-bootstrap";
import NotificationDropdown from "../layout/NotificationDropdown";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../../css/layout/Header.css";

const Header = ({ page, auth }) => {
  const [navPage, setNavPage] = useState(page);

  const changePage = (e) => {
    setNavPage(e.target.id);
  };

  return (
    <div className='header__background one-edge-shadow'>
      <div className='container header__div'>
        <div className='header__main-div'>
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
        </div>

        <div className='header__sub-div'>
          <Dropdown>
            <Dropdown.Toggle
              className='header__sub-nav'
              variant=''
              id='dropdown-basic'>
              <div>
                <i className='far fa-bell'></i>
                <p>Notification</p>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className='header__notification-dropdown'>
              {auth.user && auth.user.notifications.length > 0 ? (
                auth.user.notifications.map((notification, index) => (
                  <NotificationDropdown
                    notification={notification}
                    key={index}
                  />
                ))
              ) : (
                <div className="header__no-notifications-div">
                  <h3>No Notifications!</h3>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle
              className='header__sub-nav'
              variant=''
              id='dropdown-basic'>
              <div>
                <i className='far fa-user'></i>
                <p>Profile</p>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  getUserById: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
