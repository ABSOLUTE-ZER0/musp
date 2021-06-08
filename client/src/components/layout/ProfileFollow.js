import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser, updatePassword } from "../../actions/authActions";

import "../../css/layout/ProfileFollow.css";

const ProfileFollow = ({ user, updateUser, updatePassword, setAlert }) => {
  const [option, setOption] = useState("following");
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <div className='profileSettings__main-div'>
      <div className='profileSettings__options'>
        <button
          onClick={() => setOption("following")}
          className='btn btn-info profileSettings__options-button'>
          Following
        </button>
        <button
          onClick={() => setOption("followers")}
          className='btn btn-info profileSettings__options-button'>
          Followers
        </button>
      </div>
      <div className='profileSettings__body'>
        <div className='profileSettings__alert-div'></div>

        {option === "following" && <div>test</div>}
        {option === "followers" && <div>hello</div>}
      </div>
    </div>
  );
};

ProfileFollow.propTypes = {
  updateUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateUserFail: PropTypes.func.isRequired,
};

export default connect(null, {
  updateUser,
  updatePassword,
})(ProfileFollow);
