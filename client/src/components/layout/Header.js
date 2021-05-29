import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Dropdown } from "react-bootstrap";
import NotificationDropdown from "../layout/NotificationDropdown";
import ProfileDropdown from "../layout/ProfileDropdown";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../../css/layout/Header.css";

const Header = ({ page, auth }) => {
  const [navPage, setNavPage] = useState(page);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let count = 0;
    auth.user.notifications.forEach((notification) => {
      if (!notification.read) {
        count++;
      }
      setUnread(count);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user.notifications]);

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
                {unread > 0 && (
                  <i className='fas fa-circle header__unread-count'>
                    {" "}
                    <span>{unread}</span>{" "}
                  </i>
                )}
                <i className='fas fa-bell'></i>
                <p>Notification</p>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className='header__notification-dropdown box-shadow-1'>
              <div className='header__notification-title'>
                <h2>notifications</h2>
              </div>
              <hr style={{ margin: "0" }}></hr>
              {auth.user.notifications.length > 0 ? (
                auth.user.notifications.map((notification, index) => (
                  <NotificationDropdown
                    notification={notification}
                    key={index}
                  />
                ))
              ) : (
                <div className='header__no-notifications-div'>
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
                <i className='fas fa-user'></i>
                <p>Profile</p>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className='header__profile-dropdown box-shadow-1'>
              <ProfileDropdown />
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
