import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserByIdFollow } from "../../actions/authActions";

import { createBrowserHistory } from "history";

const history = createBrowserHistory({});


const FollowListUser = ({ user, getUserByIdFollow }) => {
  const [author, setAuthor] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setAuthor(await getUserByIdFollow(user));
    }
    fetchData();

    return () => {
      setAuthor(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserByIdFollow]);

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

  return author && (
    <tr>
      <td style={{  fontWeight: "900" }}>
        {" "}
        {author.name.length > 20
          ? author.name.substring(0, 20) + " ..."
          : author.name}
      </td>
      <td>
        {author.email.length > 30
          ? author.email.substring(0, 30) + " ..."
          : author.email}
      </td>
      <td>
        {author.isOnline ? (
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
          timeCalc(author.lastOnline)
        )}
      </td>
      <td>
        <Link
          className='btn btn-info userid__link'
          onClick={() => {history.push(`/profile/${author._id}`) ; history.go(0)}}>
          Visit
        </Link>
      </td>
    </tr>
  );
};

export default connect(null, { getUserByIdFollow })(FollowListUser);