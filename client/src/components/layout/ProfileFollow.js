import React, { useState } from "react";
import FollowList from "./FollowList";

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
        {option === "following" && <div>{user.following.length !== 0 ? <FollowList users={user.following} /> : <h1>Egoistic! Not following anyone</h1>}</div>}
        {option === "followers" && <div>{user.followers.length !== 0 ? <FollowList users={user.followers} /> : <h1>Poor Soul! No one is following</h1>}</div>}
      </div>
    </div>
  );
};

export default ProfileFollow;
