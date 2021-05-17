import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/layout/Alert.css"


const Alert = ({ alert }) => {
  if (alert.msg) {
    return (
      <div key={alert.id} className={`alert__main-div alert-${alert.type} one-edge-shadow`}>
        <i className='fas fa-info-circle'> {alert.msg} </i>
      </div>
    );
  }
  return <div />;
};

Alert.prototype = {
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert.alert,
});

export default connect(mapStateToProps)(Alert);
