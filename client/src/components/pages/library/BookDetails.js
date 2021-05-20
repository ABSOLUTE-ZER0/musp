import React, { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../layout/Header";
import BorrowModal from "../../layout/BorrowModal";

import "../../../css/library/BookDetails.css";
import { getBook, borrowBook } from "../../../actions/libraryActions";
import { loadUser } from "../../../actions/authActions";
import { showBorrowModal } from "../../../actions/modalActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Markup } from "interweave";

const BookDetails = ({
  getBook,
  showBorrowModal,
  borrowBook,
  library: { book },
  loadUser,
  auth: { user },
}) => {
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      await getBook(id);
      await loadUser();
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBook]);

  const setBorrowButton = () => {
    const date = new Date();
    if (book.borrowedBy === user._id) {
      if (book.borrowEndDate > date) {
        return (<button
        onClick={handleBorrow}
        style={{ backgroundColor: "#0062cc" }}
        className='bookDetails__borrow-btn'>
        Re-Borrow
      </button>)
      } else {
        return (<button
          onClick={handleBorrow}
          style={{ backgroundColor: "#28a745" }}
          className='bookDetails__borrow-btn'>
          Borrowed
        </button>)
      }
    } else {
      return (<button
        onClick={handleBorrow}
        className='bookDetails__borrow-btn'>
        Borrow
      </button>)
    }
  }

  const handleBorrow = () => {
    const date = new Date();
    if (book.borrowedBy === user._id) {
      if (book.borrowEndDate > date) {
        showBorrowModal("reBorrow");
      } else {
        showBorrowModal("borrowed");
      }
    } else {
      if (book.avaliability) {
        showBorrowModal("borrow");
        borrowBook(book.bookId);
      } else {
        showBorrowModal("notAvailable");
      }
    }
  };

  return (
    book && (
      <div>
        <Header page='header__library' />
        <div className='bookDetails__main-div'>
          <div className='bookDetails__background'>
            <div
              className={
                book.bookImage
                  ? "bookDetails__book-background before"
                  : "bookDetails__book-background"
              }>
              <img src={book.bookImage} alt='Book Img' />
            </div>
            <div className='bookDetails__details'>
              <p className='bookDetails__rating'>
                <span>Rating: </span>
                {book.averageRating === "N.A."
                  ? "N.A."
                  : book.averageRating + " / 5"}
              </p>
              <h1 className='bookDetails__title'>{book.title}</h1>
              <h1 className='bookDetails__subtitle'>{book.subtitle}</h1>
              <p className='bookDetails__desc'>
                {" "}
                <Markup content={book.description} />
              </p>
              <p className='bookDetails__avaliability'>
                Avaliability:{" "}
                {book.avaliability ? (
                  <span style={{ color: "green" }}>True</span>
                ) : (
                  <span style={{ color: "orangered" }}>False</span>
                )}
              </p>
              {user && setBorrowButton()}
              <BorrowModal id={book.bookId} borrowedName={book.borrowedName} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

BookDetails.propTypes = {
  getBook: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  openSearchPage: PropTypes.func.isRequired,
  showBorrowModal: PropTypes.func.isRequired,
  borrowBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  library: state.library,
});

export default connect(mapStateToProps, {
  getBook,
  loadUser,
  showBorrowModal,
  borrowBook,
})(BookDetails);
