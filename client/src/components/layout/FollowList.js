import React from "react";
import { Table } from "react-bootstrap";
import "../../css/layout/UserId.css";
import FollowListUser from "./FollowListUser";

const FollowList = ({ users }) => {
  const headings = ["Name", "Email", "Last Seen", "Profile"];

  return (
    <div className='userid__main-div'>
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
            <FollowListUser key={index} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FollowList;
