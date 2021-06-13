import React from "react";
import { Link } from "react-router-dom";
import Form2 from "./Form2";
import "../../css/layout/ProfileForm.css";
import dateFormat from "dateformat";

const ProfileForm = ({ forms, user }) => {
  return (
    <div>
      <div className='profileForm__main-div'>
        <ul className='timeline'>
          {forms.map((form, index) => (
            <li key={index}>
              <div className='profileForm__timeline'>
                <div className='timeline-time'>
                  <span className='date'>
                    {dateFormat(form.date, "fullDate")}
                  </span>
                  <span className='time'>{dateFormat(form.date, "HH:MM")}</span>
                </div>
                <div className='timeline-icon'>
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
                  to={{ pathname: `/post/${form._id}`, state: { form: form } }}
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
