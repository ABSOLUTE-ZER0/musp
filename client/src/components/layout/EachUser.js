import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { followUser } from "../../actions/authActions";
import dateFormat from "dateformat";

const EachUser = ({ user, followUser, auth }) => {
  const timeCalc = (date_future1) => {
    const date_now = new Date();
    const date_future = new Date(date_future1);
    var d = Math.abs(date_future - date_now) / 1000;
    var r = {};
    var s = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    Object.keys(s).every((key) => {
      let time = Math.floor(d / s[key]);
      d -= time * s[key];

      if (time > 1) {
        r = time + " " + key + "s";
        return false;
      }
      if (time !== 0) {
        r = time + " " + key;
        return false;
      }
      return true;
    });

    return r;
  };

  const [isFollowing, setIsFollowing] = useState(null);

  const onFollow = (id) => {
    followUser(id);
    setIsFollowing(!isFollowing);
  };

  return (
    <tr>
      <td style={{ textAlign: "left", fontWeight: "900" }}> {user.name.length > 20
              ? user.name.substring(0, 20) + " ..."
              : user.name}</td>
      <td style={{ textAlign: "left" }}>{user.email.length > 30
              ? user.email.substring(0, 30) + " ..."
              : user.email}</td>
      <td>
        {user.isOnline ? (
          <p
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "10rem",
              textAlign: "center",
              margin: "0",
            }}>
            Online
          </p>
        ) : (
          timeCalc(user.lastOnline)
        )}
      </td>
      <td>{dateFormat(user.date, "mmmm dS, yyyy")}</td>
      <td>
        {(isFollowing === null ?
        setIsFollowing(auth.user.following.includes(user._id)) : true) &&
        isFollowing ? auth.user._id !== user._id && (
          <button
            onClick={() => {
              onFollow(user._id);
            }}
            className='btn btn-outline-danger'
            style={{fontSize:"1.2rem", borderRadius:"10rem", padding:"0.1rem 2rem"}}>
            Following
          </button>
        ) : auth.user._id !== user._id && (
          <button
            onClick={() => {
              onFollow(user._id);
            }}
            className='btn btn-danger'
            style={{fontSize:"1.2rem", borderRadius:"10rem", padding:"0.1rem 2rem"}}>
            Follow
          </button>
        )}
      </td>
      <td>
        <Link className='btn btn-info userid__link' to={`/profile/${user._id}`}>
          Visit
        </Link>
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { followUser })(EachUser);
