import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

import "../../css/layout/UserId.css";

const UserId = ({ users }) => {
  const headings = [
    "Name",
    "Email",
    "Last Seen",
    "Joined On",
    "Followers",
    "Profile",
  ];

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

  return (
    <div className='userid__main-div'>
      {users.length !== 0 ? (
        <Table responsive>
          <thead className='userid__heading'>
            <tr>
              {headings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ textAlign: "left", fontWeight:"900" }}>{user.name}</td>
                <td style={{ textAlign: "left" }}>{user.email}</td>
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
                <td>{user.followers.length}</td>
                <td>
                  <Link className="userid__link" to={`/profile/${user._id}`}>Visit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h4 className='userid__nouser'>No users found!</h4>
      )}
    </div>
  );
};

export default UserId;
