import React from 'react'
import "../../css/layout/ProfileDropdown.css"
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";


const ProfileDropdown = ({
  auth: {user},
  logout
}) => {
  return (
    <div className="profileDropdown__body"> 
      <hr></hr>
      <button onClick={logout} className="profileDropdown__signout btn btn-danger">Sign Out</button>
    </div>
  )
}


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
