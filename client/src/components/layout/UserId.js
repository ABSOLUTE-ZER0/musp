import React from "react";
import { Table } from "react-bootstrap";
import "../../css/layout/UserId.css";
import EachUser from "./EachUser";

const UserId = ({  users }) => {
  const headings = [
    "Name",
    "Email",
    "Last Seen",
    "Joined On",
    "Follow",
    "Profile",
  ];

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
              <EachUser key={index} user={user} />
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
