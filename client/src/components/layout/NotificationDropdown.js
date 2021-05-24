import React from "react";
import "../../css/layout/NotificationDropdown.css";
import { getUserById, loadUser } from "../../actions/authActions";
import {
  readMessage,
  deleteMessage,
  replyLendBook,
} from "../../actions/libraryActions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import dateFormat from "dateformat";

const NotificationDropdown = ({
  notification,
  getUserById,
  readMessage,
  loadUser,
  replyLendBook,
  deleteMessage,
  auth: { user },
}) => {
  const [sender, setSender] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setSender(await getUserById(notification.senderId));
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadUser]);

  const clicked = async () => {
    setClick(!click);
    if (!notification.read) {
      await readMessage(notification.id);
      await loadUser();
    }
  };

  const reply = async (responce) => {
    replyLendBook(sender._id, user.name, notification.bookName, responce);
    removeNotification()
  };

  const removeNotification = async() => {
    await deleteMessage(notification.id);
    await loadUser();
    setClick(false)
  }

  let date = new Date(notification.date);

  date = dateFormat(date, "mmmm dS, h:MM");

  return (
    <div style={{ position: "relative" }}>
      {click && (
        <button onClick={removeNotification} className='notificationDropdown__close'>
          <i className='fas fa-times'></i>
        </button>
      )}
      {!notification.read && (
        <button className='notificationDropdown__unred-mark'>
        </button>
      )}
      <div
        onClick={clicked}
        className={classNames("notificationDropdown__div", {
          clicked: click,
          read: notification.read,
        })}>
        <div className={click && "notificationDropdown__clicked-profile-div"}>
          <div
            style={sender && { backgroundColor: `${sender.color}` }}
            className='notificationDropdown__profile-img'>
            {sender && <p>{sender.name[0]}</p>}
          </div>
          {click && (
            <div className='notificationDropdown__clicked-name-div'>
              <p className='notificationDropdown__sender-name'>{sender.name}</p>
              <p className='notificationDropdown__date'>{date}</p>
            </div>
          )}
        </div>

        <div
          className={classNames("notificationDropdown__message", {
            clicked: click,
          })}>
          {sender && <p>{notification.message}</p>}
        </div>
      </div>
      {click && notification.type==="request" && (
        <div className='notificationDropdown__button-div'>
          <button onClick={() => reply("REJECTED")} className='notificationDropdown__button-reject'>
            Reject
          </button>
          <button onClick={() => reply("ACCEPTED")} className='notificationDropdown__button-accept'>
            Accept
          </button>
        </div>
      )}
      {click && notification.type==="responce" && (
        <div className='notificationDropdown__button-div'>
          <button onClick={removeNotification} className='notificationDropdown__button-understood'>
            Understood
          </button>
        </div>
      )}
      <hr style={{ margin: "0", backgroundColor: "rgb(206, 200, 206)" }}></hr>
    </div>
  );
};

NotificationDropdown.propTypes = {
  getUserById: PropTypes.func.isRequired,
  readMessage: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  replyLendBook: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  modal: state.modal,
  form: state.form,
});

export default connect(mapStateToProps, {
  getUserById,
  readMessage,
  loadUser,
  deleteMessage,
  replyLendBook,
})(NotificationDropdown);
