import React, { useState } from "react";

import "../../css/layout/ProfileFollow.css";

const ProfileFollow = ({ user }) => {
  const [option, setOption] = useState("following");

  return (
    <div className='profileSettings__main-div'>
      <div className='profileSettings__options'>
        <button
          onClick={() => setOption("following")}
          className={
            option === "following"
              ? "btn btn-info ProfileFollow__options-button"
              : "btn btn-outline-info ProfileFollow__options-button"
          }>
          Following
        </button>
        <button
          onClick={() => setOption("followers")}
          className={
            option === "followers"
              ? "btn btn-info ProfileFollow__options-button"
              : "btn btn-outline-info ProfileFollow__options-button"
          }>
          Followers
        </button>
      </div>
      <div className='profileSettings__body'>
        {option === "following" && <div>test</div>}
        {option === "followers" && <div>hello</div>}
      </div>
    </div>
  );
};

export default ProfileFollow;
