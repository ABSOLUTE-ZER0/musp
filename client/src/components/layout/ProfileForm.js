import React from "react";
import { Link } from "react-router-dom";
import Form2 from "./Form2";
import "../../css/layout/ProfileForm.css";
import dateFormat from "dateformat";

const ProfileForm = ({ forms, user }) => {

  return (
    <div>
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
              <div
                style={{
                  borderRightColor: `${form.post_color
                    .substring(0, form.post_color.length - 1)
                    .concat("Solid)")}`,
                }}
                className='timeline-body'>
                <Link
                  key={index}
                  to={`/post/${form._id}`}
                  className='home__link'>
                  <Form2 form={form} user={user} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {forms.length === 0 && (
        <div>
          <h3 className='profileForm__no-posts'>
            {user.name} has not created any posts!
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
