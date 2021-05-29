import React from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import "../../css/layout/ProfileForm.css";
import dateFormat from "dateformat";

const ProfileForm = ({ forms,user }) => {
  return (
    <div className='profileForm__main-div'>
        <ul class='timeline'>
          {forms.map((form, index) => (
            <li>
              <div className='profileForm__timeline'>
                <div class='timeline-time'>
                  <span class='date'>{dateFormat(form.date, "fullDate")}</span>
                  <span class='time'>{dateFormat(form.date, "HH:MM")}</span>
                </div>
                <div class='timeline-icon'>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>&nbsp;</a>
                </div>
              </div>
              <div className="timeline-body">
              <Link key={index} to={`/post/${form._id}`} className='home__link'>
                <Form form={form} user={user} />
              </Link>
              </div>
                
            </li>
          ))}
        </ul>
    </div>
  );
};

export default ProfileForm;
