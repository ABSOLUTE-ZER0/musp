import React, { useEffect, useState } from "react";
import Header from "../../layout/Header";
import PropTypes from "prop-types";
import { getBorrowedBooks } from "../../../actions/libraryActions";
import { createdPost } from "../../../actions/formActions";
import { connect } from "react-redux";
import "../../../css/others/Profile.css";
import FooterLarge from "../../layout/FooterLarge";
import classNames from "classnames";
import ProfileForm from "../../layout/ProfileForm";
import ProfileBook from "../../layout/ProfileBook";
import ProfileSettings from "../../layout/ProfileSettings";
import ProfileFollow from "../../layout/ProfileFollow";

const Profile = ({
  auth: { user },
  library: { books },
  form: { forms },
  getBorrowedBooks,
  createdPost,
}) => {
  const [page, setPage] = useState("posts");
  const [year, setYear] = useState(null);
  const id = user._id;

  useEffect(() => {
    getBorrowedBooks(id);
    createdPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBorrowedBooks, createdPost]);

  useEffect( () => () => console.log("unmount"), [] );

  if (!year) {
    let Year = user.email;
    const date = new Date();
    Year = date.getFullYear() - Year.split("@")[0].slice(-5, -3) - 2000;

    if (Year === 1) {
      setYear("1st Year");
    }
    if (Year === 1) {
      setYear("1st Year");
    }
    if (Year === 1) {
      setYear("1st Year");
    }
    if (Year === 1) {
      setYear("1st Year");
    }
  }

  return (
    books &&
    forms && (
      <div>
        <Header />
        <div style={{ background: `linear-gradient( 180deg, ${user.color} 0%, ${user.color} 40rem, white 40rem, white 100% )` }} className='profile__background-div'>
          <div className='profile__main-div one-edge-no-shadow'>
            <div className='container'>
              <div>
                <div className='profile__tracker-div'>
                  <div className='profile__tracker'>
                    <p>{forms.length}</p>
                    <h4>Posts</h4>
                  </div>
                  <div className='profile__tracker'>
                    <p>{books.length}</p>
                    <h4>Books</h4>
                  </div>
                  <div className='profile__tracker'>
                    <p>{user.followers.length}</p>
                    <h4>Followers</h4>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: `${user.color}`,
                    color: user.textColor,
                  }}
                  className='profile__profile-img text-shadow box-shadow-circle-down'>
                  <p>{user.name[0]}</p>{" "}
                </div>
                <p
                  className={
                    user.isOnline ? "profile__online" : "profile__offline"
                  }>
                  <i className='fas fa-circle'></i>{" "}
                  {user.isOnline ? "Online" : user.lastOnline}
                </p>
              </div>
              <div className='profile__name-div'>
                <h1>{user.name}</h1>
                <h4>
                  <i className='fas fa-user-graduate'></i> Undergraduate
                </h4>
                {user.bio ? (
                  <p style={{ whiteSpace: "pre-line" }}>{user.bio}</p>
                ) : (
                  <p>No bio!</p>
                )}
              </div>
              <hr style={{ marginTop: "5rem" }}></hr>
              <div className='profile__page-button-div'>
                <button
                  style={{
                    backgroundColor: page === "posts" && user.color,
                    color: page === "posts" && user.textColor,
                  }}
                  onClick={() => setPage("posts")}
                  className={classNames("profile__page-button", {
                    "active one-edge-shadow": page === "posts",
                  })}>
                  <i className='fab fa-wpforms'></i>
                  <p>Posts</p>
                </button>
                <button
                  style={{
                    backgroundColor: page === "books" && user.color,
                    color: page === "books" && user.textColor,
                  }}
                  onClick={() => setPage("books")}
                  className={classNames("profile__page-button", {
                    "active one-edge-shadow": page === "books",
                  })}>
                  <i className='fas fa-book'></i>
                  <p>Books</p>
                </button>
                <button
                  style={{
                    backgroundColor: page === "follow" && user.color,
                    color: page === "follow" && user.textColor,
                  }}
                  onClick={() => setPage("follow")}
                  className={classNames("profile__page-button", {
                    "active one-edge-shadow": page === "follow",
                  })}>
                  <i className='fas fa-users'></i>
                  <p>Follow</p>
                </button>
                <button
                  style={{
                    backgroundColor: page === "settings" && user.color,
                    color: page === "settings" && user.textColor,
                  }}
                  onClick={() => setPage("settings")}
                  className={classNames("profile__page-button", {
                    "active one-edge-shadow": page === "settings",
                  })}>
                  <i className='fas fa-cog'></i>
                  <p>Settings</p>
                </button>
              </div>
              <div className='profile__page-main-div'>
                {page === "posts" && <ProfileForm forms={forms} user={user} />}
                {page === "books" && <ProfileBook books={books} user={user} />}
                {page === "follow" && <ProfileFollow user={user} />}
                {page === "settings" && <ProfileSettings user={user} />}
              </div>
            </div>
          </div>
        </div>
        <FooterLarge />
      </div>
    )
  );
};

Profile.propTypes = {
  getBorrowedBooks: PropTypes.func.isRequired,
  createdPost: PropTypes.func.isRequired,
  auth: PropTypes.object,
  modal: PropTypes.object,
  form: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  library: state.library,
  form: state.form,
});

export default connect(mapStateToProps, { getBorrowedBooks, createdPost })(
  Profile
);
