import React, { useEffect, useState } from "react";
import Header from "../../layout/Header";
import Comment from "../../layout/FormComments";
import Alert from "../../layout/Alert";
import { connect } from "react-redux";
import { useParams } from "react-router";
import {
  postComment,
  upvotePost,
  favouritePost,
} from "../../../actions/formActions";
import { getUserById, loadUser } from "../../../actions/authActions";
import { setAlert } from "../../../actions/alertActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../../../css/home/FormDetail.css";
import dateFormat from "dateformat";
import classNames from "classnames";
import FooterLarge from "../../layout/FooterLarge";
import { useLocation } from "react-router-dom";

const FormDetails = ({
  auth: { user },
  getUserById,
  loadUser,
  setAlert,
  postComment,
  upvotePost,
  favouritePost,
}) => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [date, setDate] = useState(null);
  const [desc, setDesc] = useState("");
  const [upvoted, setUpvote] = useState(null);
  const [favourite, setFavourite] = useState(null);

  const { form } = useLocation().state;

  useEffect(() => {
    async function fetchData() {
      await loadUser();
      setAuthor(await getUserById(form.author));
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserById]);

  useEffect(() => () => console.log("unmount"), []);

  if (form && !date) {
    setDate(dateFormat(Date(form.date), "fullDate"));
  }

  const setUpState = async () => {
    setUpvote(await form.upvoteList.includes(user._id));
    setFavourite(await form.favouriteList.includes(user._id));
  };

  user && form && upvoted === null && setUpState();

  const onSubmit = () => {
    if (!desc) {
      return setAlert("Enter Something!", "warning");
    }
    const comment = {
      author: user._id,
      desc,
      date: new Date(),
    };
    postComment(comment, id);
  };

  const clickedUpvote = () => {
    setUpvote(!upvoted);
    upvotePost(id);
  };

  const clickedFavourite = () => {
    setFavourite(!favourite);
    favouritePost(id);
  };

  return (
    author &&
    user && (
      <div className='formDetail__main-div'>
        <Header page='header__forum' />
        <div
          style={{
            backgroundColor: `${form.post_color
              .substring(0, form.post_color.length - 1)
              .concat("Solid)")}`,
          }}
          className='formDetail__top-type-bar'>
          <p>{form.title}</p>
          <div>
            {form.tags &&
              form.tags.map((tags, index) => (
                <div
                  key={index}
                  style={{
                    color: `${form.post_color
                      .substring(0, form.post_color.length - 1)
                      .concat("Solid)")}`,
                  }}
                  className='formDetail__tag'>
                  {tags}
                </div>
              ))}
          </div>
        </div>
        <div className='container'>
          <div className='formDetail__quetion-div'>
            <div
              style={{
                backgroundColor: `${author.color}`,
                color: author.textColor,
              }}
              className='formDetail__profile-img'>
              <Link className='formDetail__profile-img-link' to={author && `/profile/${author._id}`}>
                <p style={{color: author.textColor}}>{author.name[0]}</p>
                {author && author.isOnline && (
                  <i className='fas fa-circle formDetail__online-circle'></i>
                )}
              </Link>
            </div>

            <div>
              <p className='formDetail__start-date'>
                <h1>{author ? author.name : null}</h1>
                <p>{date}</p>
              </p>
              <p className='formDetail__desc'>{form.desc}</p>
            </div>
          </div>
          <div style={{ display: "flex", userSelect: "none" }}>
            <div
              onClick={clickedUpvote}
              className={classNames("formDetail__upvote-div", {
                upvoted: upvoted,
              })}>
              Like{"  "}
              <i
                className={classNames("fa-thumbs-up", {
                  far: !upvoted,
                  fas: upvoted,
                })}></i>
            </div>
            <div
              onClick={clickedFavourite}
              className={classNames("formDetail__favourite-div", {
                favourite: favourite,
              })}>
              Favourite{"  "}
              <i
                className={classNames("fa-star", {
                  far: !favourite,
                  fas: favourite,
                })}></i>
            </div>
          </div>

          <hr />
          <Alert />
          <div className='formDetail__comment-div'>
            <div
              style={{
                backgroundColor: `${user.color}`,
                color: user.textColor,
              }}
              className='formDetail__profile-img'>
              <p>{user.name[0]}</p>
            </div>
            <div className='formDetail__comment'>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className='formDetail__comment-box'
                rows={10}
                name='text'
                placeholder='Write a comment'></textarea>
              <button
                onClick={onSubmit}
                style={{
                  backgroundColor: `${form.post_color
                    .substring(0, form.post_color.length - 1)
                    .concat("Solid)")}`,
                }}>
                Submit
              </button>
            </div>
          </div>
          <div className='formDetail__all-comments-div'>
            <h1>Comments</h1>
            {form.comments.length > 0 ? (
              form.comments
                .slice(0)
                .reverse()
                .map((comment, index) => (
                  <Comment
                    key={index}
                    comment={comment}
                    post_color={form.post_color}
                  />
                ))
            ) : (
              <div>
                <hr></hr>
                <h3 style={{ marginTop: "5rem", textAlign: "center" }}>
                  No Comments!
                </h3>
              </div>
            )}
          </div>
        </div>
        <FooterLarge />
      </div>
    )
  );
};

FormDetails.propTypes = {
  form: PropTypes.object,
  auth: PropTypes.object,
  getUserById: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  upvotePost: PropTypes.func.isRequired,
  favouritePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  form: state.form,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUserById,
  loadUser,
  setAlert,
  postComment,
  upvotePost,
  favouritePost,
})(FormDetails);
