import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateUser,
  updatePassword,
} from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";
import Alert from "./Alert";

import { ChromePicker } from "react-color";

import "react-color-picker/index.css";
import "../../css/layout/ProfileSettings.css";

const ProfileSettings = ({
  user,
  updateUser,
  updatePassword,
  setAlert,
}) => {
  const [newuser, setNewuser] = useState({
    name: user.name,
    bio: user.bio,
    color: user.color,
    textColor: user.textColor,
    email: user.email,
    oldpassword: "",
    password: "",
    password2: "",
  });

  const [option, setOption] = useState("account");
  const [color, setColor] = useState(user.color);
  const [colorPicker, setColorPicker] = useState(false);
  const [colorPicker1, setColorPicker1] = useState(false);
  const [textColor, setTextColor] = useState(user.textColor);

  const handleInput = (e) => {
    setNewuser({ ...newuser, [e.target.name]: e.target.value });
  };

  const colorChangeComplete = (color, e) => {
    setColor(color.hex);
    e.preventDefault();
  };

  const colorChange = (color, e) => {
    setColor(color.hex);
    e.preventDefault();
  };

  const colorChangeComplete1 = (color, e) => {
    setTextColor(color.hex);
    e.preventDefault();
  };

  const colorChange1 = (color, e) => {
    setTextColor(color.hex);
    e.preventDefault();
  };

  const updateUserSubmit = async () => {
    const userdata = {
      name: newuser.name,
      bio: newuser.bio,
      color: color,
      textColor: textColor,
    };
    const res = await updateUser(userdata);
    console.log(res);
  };

  const resetPassword = async () => {
    const finalUser = {
      password: newuser.password,
      oldPassword: newuser.oldpassword,
    };
    if (newuser.password !== newuser.password2) {
      await setAlert("Confirm password does not match", "warning");
    }
    else {
      if(newuser.password.length <=6 ){
        return await setAlert("Password must contain more than 6 characters", "warning");
     }
     if (newuser.password === newuser.oldpassword) {
      return await setAlert("New password is same as old!", "warning");
    }
      const res = await updatePassword(finalUser);
      if (res && res.data && res.data.errors) {
        await setAlert(res.data.errors[0].msg, "warning");
      }
    }
  };

  return (
    <div className='profileSettings__main-div'>
      <div className='profileSettings__options'>
        <button
          onClick={() => setOption("account")}
          className='btn btn-info profileSettings__options-button'>
          Account details
        </button>
        <button
          onClick={() => setOption("password")}
          className='btn btn-info profileSettings__options-button'>
          Change password
        </button>
      </div>
      <div className='profileSettings__body'>
      <div className="profileSettings__alert-div">
      <Alert />
        
      </div>

        {option === "account" && (
          <div className='profileSettings__body-account'>
            <div className='profileSettings__input-div'>
              <i className='fas fa-user' />
              <label className='profileSettings__label'>Full Name</label>
              <input
                className='profileSettings__input'
                type='name'
                name='name'
                onChange={handleInput}
                placeholder='Name'
                value={newuser.name}
                autoComplete='off'
              />
            </div>
            <div className='profileSettings__input-div'>
              <i className='fas fa-palette'></i>
              <label className='profileSettings__label'>
                Profile Image color
              </label>
              <input
                onClick={() => {
                  setColorPicker(!colorPicker);
                  setColorPicker1(false);
                }}
                className='profileSettings__input'
                type='name'
                value={color}
              />
              {colorPicker && (
                <div>
                  <ChromePicker
                    color={color}
                    className='profileSettings__color-picker'
                    onChangeComplete={colorChangeComplete}
                    onChange={colorChange}
                  />
                  <button
                    onClick={() => setColorPicker(false)}
                    className='profileSettings__color-picker-btn btn btn-success'>
                    save
                  </button>
                </div>
              )}
            </div>

            <div className='profileSettings__input-div'>
              <i className='fas fa-palette'></i>
              <label className='profileSettings__label'>
                Profile Image Inner Text Color
              </label>
              <input
                onClick={() => {
                  setColorPicker1(!colorPicker1);
                  setColorPicker(false);
                }}
                className='profileSettings__input'
                type='name'
                value={textColor}
              />
              {colorPicker1 && (
                <div>
                  <ChromePicker
                    color={textColor}
                    className='profileSettings__color-picker'
                    onChangeComplete={colorChangeComplete1}
                    onChange={colorChange1}
                  />
                  <button
                    onClick={() => setColorPicker1(false)}
                    className='profileSettings__color-picker-btn btn btn-success'>
                    save
                  </button>
                </div>
              )}
            </div>

            <div className='profileSettings__input-div'>
              <i className='far fa-envelope' />
              <label className='profileSettings__label'>Email</label>
              <p
                className='profileSettings__input'
                type='email'
                name='email'
                disabled
                onChange={handleInput}
                placeholder='Email'
                style={{ cursor: "no-drop" }}
                autoComplete='off'>
                {user.email}
              </p>
            </div>

            <div className='profileSettings__input-div'>
              <i className='far fa-newspaper' />
              <label className='profileSettings__label'>Bio</label>
              <textarea
                rows={5}
                className='profileSettings__input'
                type='bio'
                name='bio'
                onChange={handleInput}
                placeholder='Bio'
                value={newuser.bio}
                autoComplete='off'
              />
            </div>
            <button
              onClick={updateUserSubmit}
              className='profileSettings__save-btn btn btn-success'>
              <i className='fas fa-check'></i> Save
            </button>
          </div>
        )}

        {option === "password" && (
          <div className='profileSettings__body-account'>
            <div className='profileSettings__input-div'>
              <i className='fas fa-lock' />
              <label className='profileSettings__label'>Old Password</label>
              <input
                className='profileSettings__input'
                type='password'
                name='oldpassword'
                onChange={handleInput}
                placeholder='Old Password'
                value={newuser.oldpassword}
                autoComplete='off'
              />
            </div>
            <div className='profileSettings__input-div'>
              <i className='fas fa-lock' />
              <label className='profileSettings__label'>New Password</label>
              <input
                className='profileSettings__input'
                type='password'
                name='password'
                onChange={handleInput}
                placeholder='New Password'
                value={newuser.password}
                autoComplete='off'
              />
            </div>

            <div className='profileSettings__input-div'>
              <i className='fas fa-lock' />
              <label className='profileSettings__label'>
                Confirm New Password
              </label>
              <input
                className='profileSettings__input'
                type='password'
                name='password2'
                onChange={handleInput}
                placeholder='Confirm New Password'
                value={newuser.password2}
                autoComplete='off'
              />
            </div>
            <button
              onClick={resetPassword}
              className='profileSettings__save-btn btn btn-success'>
              <i className='fas fa-check'></i> Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileSettings.propTypes = {
  updateUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateUserFail: PropTypes.func.isRequired,
};

export default connect(null, {
  updateUser,
  setAlert,
  updatePassword,
})(ProfileSettings);
