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
import FooterLarge from "../../layout/FooterLarge";

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
      if (!user) {
        await loadUser();
      }
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBook]);

  useEffect( () => () => console.log("unmount"), [] );

  const setBorrowButton = () => {
    const date = new Date();
    if (book.borrowedBy === user._id) {
      if (book.borrowEndDate > date) {
        return (
          <button
            onClick={handleBorrow}
            style={{ backgroundColor: "#0062cc" }}
            className='bookDetails__borrow-btn'>
            Re-Borrow
          </button>
        );
      } else {
        return (
          <button
            onClick={handleBorrow}
            style={{ backgroundColor: "#28a745" }}
            className='bookDetails__borrow-btn'>
            Borrowed
          </button>
        );
      }
    } else {
      return (
        <button onClick={handleBorrow} className='bookDetails__borrow-btn'>
          Borrow
        </button>
      );
    }
  };

  const handleBorrow = () => {
    const date = new Date();
    if (book.borrowedBy === user._id) {
      if (book.borrowEndDate > date) {
        showBorrowModal("reBorrow");
      } else {
        showBorrowModal("borrowed");
      }
    } else {
      if (book.availability) {
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
              <h1 className='bookDetails__title'>{book.title}</h1>
              <h1 className='bookDetails__subtitle'>{book.subtitle}</h1>
              {book.authors && (
                <h1 className='bookDetails__author'>~ {book.authors[0]}</h1>
              )}
              <p className='bookDetails__desc'>
                {" "}
                <Markup
                  content={
                    book.description && book.description.length > 800
                      ? book.description.substring(0, 800) + " ..."
                      : book.description
                  }
                />
              </p>
              <p className='bookDetails__availability'>
                Availability:{" "}
                {book.availability ? (
                  <span style={{ color: "green" }}>True</span>
                ) : (
                  <span style={{ color: "orangered" }}>False</span>
                )}
              </p>
              {user && setBorrowButton()}
              <BorrowModal id={book.bookId} borrowerName={book.borrowerName} />
            </div>
          </div>
          <div className='container'>
            <div>
              <h1 className='bookDetails__sub-title'>
                <span>Key </span> Features
              </h1>
              <div className='bookDetails__features'>
                <div>
                  <div>Number of times borrowed</div>
                  <div>{book.borrowedCount}</div>
                </div>

                <div>
                  <div>Total Pages</div>
                  <div>{book.pageCount ? book.pageCount : "-"}</div>
                </div>

                <div>
                  <div>Rating</div>
                  <div>
                    {book.averageRating === "N.A."
                      ? "N.A."
                      : book.averageRating + " / 5"}
                  </div>
                </div>

                <div>
                  <div>Current Borrower</div>
                  <div>{book.borrowerName ? book.borrowerName : "-"}</div>
                </div>
              </div>
            </div>

            <div>
              <h1 className='bookDetails__sub-title'>
                <span>About </span> The Book
              </h1>
              <div className='bookDetails__about-div'>
                <div className='bookDetails__about-common'>
                  <div className='bookDetails__about1'>
                    <p>Title</p>
                  </div>
                  <div className='bookDetails__about2'>
                    <p>{book.title}</p>
                  </div>
                </div>

                <div className='bookDetails__about-common'>
                  <div className='bookDetails__about1'>
                    <p>Sub-Title</p>
                  </div>
                  <div className='bookDetails__about2'>
                    <p>{book.subtitle}</p>
                  </div>
                </div>

                <div className='bookDetails__about-common'>
                  <div className='bookDetails__about1'>
                    <p>Authors</p>
                  </div>
                  <div className='bookDetails__about2'>
                    {book.authors.map((author, index) => (
                      <p key={index}>{index + 1 + ". " + author}</p>
                    ))}
                  </div>
                </div>

                <div className='bookDetails__about-common'>
                  <div className='bookDetails__about1'>
                    <p>Description</p>
                  </div>
                  <div className='bookDetails__about2'>
                    <p>{<Markup content={book.description} />}</p>
                  </div>
                </div>

                <div className='bookDetails__about-common'>
                  <div className='bookDetails__about1'>
                    <p>Page Count</p>
                  </div>
                  <div className='bookDetails__about2'>
                    <p>{book.pageCount}</p>
                  </div>
                </div>

                <div className='bookDetails__about-common'>
                  <div className='bookDetails__about1'>
                    <p>Published Date</p>
                  </div>
                  <div className='bookDetails__about2'>
                    <p>{book.publishedDate}</p>
                  </div>
                </div>

                <div className='bookDetails__about-common'>
                  <div className='bookDetails__about1'>
                    <p>Availability</p>
                  </div>
                  <div className='bookDetails__about2'>
                    <p style={{color: book.availability ? "green" : "orangered", fontWeight: "900"}}>{book.availability ? "true" : "false"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterLarge />
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
