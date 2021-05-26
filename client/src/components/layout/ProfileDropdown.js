import React from "react";
import "../../css/layout/ProfileDropdown.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const ProfileDropdown = ({ auth: { user }, logout }) => {
  return (
    <div className="profileDropdown__body">
      <div className="profileDropdown__profile">
        <div
          style={{ backgroundColor: `${user.color}` }}
          className="profileDropdown__profile-img"
        >
          <p>{user.name[0]}</p>{" "}
        </div>
        <div className="profileDropdown__profile-name">
          <p>{user.name}</p>
        </div>
      </div>

      <hr></hr>

      <div>
        <h4 style={{fontWeight:"bold"}}>Account</h4>
        <p><a className="profileDropdown__link" href="/profile">My profile</a></p>
        <p><a className="profileDropdown__link" href="/faq">FAQs</a></p>
        <p><a className="profileDropdown__link" href="/contact">Contact Us</a></p>
      </div>

      <hr></hr>
      <button
        onClick={logout}
        className="profileDropdown__signout btn btn-danger"
      >
        Sign Out
      </button>
    </div>
  );
};

ProfileDropdown.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  modal: state.modal,
  form: state.form,
});

export default connect(mapStateToProps, {
  logout,
})(ProfileDropdown);
