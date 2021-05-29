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



  const [page, setPage] = useState(null);

  useEffect(() => {
    getBorrowedBooks(id);
    createdPost(id);

    if (id === user._id) {
      history.push("/profile");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBorrowedBooks, createdPost]);

  return (
    books &&
    forms &&
    user && (
      <div>
        <Header />
        <div className='profile__background-div'>
          <div className='profile__main-div one-edge-no-shadow'>
            <div className='container'>
              <div className='profile__tracker-div'>
                <div className='profile__tracker'>
                  <p>{forms.length}</p>
                  <h4>Posts</h4>
                </div>
                <div className='profile__tracker'>
                  <p>{books.length}</p>
                  <h4>Books</h4>
                </div>
              </div>
              <div
                style={{ backgroundColor: `${user.color}` }}
                className='profile__profile-img text-shadow box-shadow-1'>
                <p>{user.name[0]}</p>{" "}
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