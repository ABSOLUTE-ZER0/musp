import React, { useEffect, useState } from "react";
import Header from "../../layout/Header";
import PropTypes from "prop-types";
import { getBorrowedBooks } from "../../../actions/libraryActions";
import { createdPost } from "../../../actions/formActions";
import { connect } from "react-redux";
import "../../../css/others/OtherProfile.css";
import FooterLarge from "../../layout/FooterLarge";
import { useParams } from "react-router";
import { getUserById } from "../../../actions/authActions";
import { createBrowserHistory } from "history";
import classNames from "classnames";
import ProfileForm from "../../layout/ProfileForm";
import ProfileBook from "../../layout/ProfileBook";
import ProfileFollow from "../../layout/ProfileFollow";


const history = createBrowserHistory({
  forceRefresh: true,
});

const OtherProfile = ({
  auth: { user },
  library: { books },
  form: { forms },
  getBorrowedBooks,
  createdPost,
  getUserById,
}) => {
  const { id } = useParams();
  const [author,setAuthor] = useState(null)

  useEffect(() => {
    async function fetchData() {
        setAuthor(await getUserById(id));
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserById]);

  const [page, setPage] = useState("posts");

  useEffect(() => {
    getBorrowedBooks(id);
    createdPost(id);

    if (id === user._id) {
      history.push("/profile");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBorrowedBooks, createdPost]);

  useEffect( () => () => console.log("unmount"), [] );


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
        r = time + " " + key + "s ago";
        return false;
      }

      if (time !== 0) {
        r = time + " " + key + " ago";
        return false;
      }

      return r;
    });

    return r;
  };

  return (
    books &&
    forms &&
    author && (
      <div>
        <Header />
        <div style={{ background: `linear-gradient( 180deg, ${author.color} 0%, ${author.color} 40rem, white 40rem, white 100% )` }} className='profile__background-div'>
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
                    <p>{author.followers.length}</p>
                    <h4>Followers</h4>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: `${author.color}`,
                    color: author.textColor,
                  }}
                  className='profile__profile-img text-shadow box-shadow-circle-down'>
                  <p>{author.name[0]}</p>{" "}
                </div>
                <p
                  className={
                    author.isOnline ? "profile__online" : "profile__offline"
                  }>
                  <i className='fas fa-circle'></i>{" "}
                  {author.isOnline ? "Online" : <p>Last Online <span>{timeCalc(author.lastOnline)}</span></p>}
                </p>
              </div>
              <div className='profile__name-div'>
                <h1>{author.name}</h1>
                <h4>
                  <i className='fas fa-user-graduate'></i> Undergraduate
                </h4>
                {author.bio ? (
                  <p style={{ whiteSpace: "pre-line" }}>{author.bio}</p>
                ) : (
                  <p>No bio!</p>
                )}
              </div>
              <hr style={{ marginTop: "5rem" }}></hr>
              <div className='profile__page-button-div'>
                <button
                  style={{
                    backgroundColor: page === "posts" && author.color,
                    color: page === "posts" && author.textColor,
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
                    backgroundColor: page === "books" && author.color,
                    color: page === "books" && author.textColor,
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
                    backgroundColor: page === "follow" && author.color,
                    color: page === "follow" && author.textColor,
                  }}
                  onClick={() => setPage("follow")}
                  className={classNames("profile__page-button", {
                    "active one-edge-shadow": page === "follow",
                  })}>
                  <i className='fas fa-users'></i>
                  <p>Followers</p>
                </button>
              </div>
              <div className='profile__page-main-div'>
                {page === "posts" && <ProfileForm forms={forms} user={author} />}
                {page === "books" && <ProfileBook books={books} user={author} />}
                {page === "follow" && <ProfileFollow user={author} />}
              </div>
            </div>
          </div>
        </div>
        <FooterLarge />
      </div>
    )
  );
};

OtherProfile.propTypes = {
  getBorrowedBooks: PropTypes.func.isRequired,
  createdPost: PropTypes.func.isRequired,
  modal: PropTypes.object,
  form: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  library: state.library,
  form: state.form,
});

export default connect(mapStateToProps, {
  getBorrowedBooks,
  createdPost,
  getUserById,
})(OtherProfile);