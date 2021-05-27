import React, { useEffect } from "react";
import Header from "../../layout/Header";
import Carouser from "../../layout/LibraryCarousel";
import FooterLarge from "../../layout/FooterLarge";
import { getPopularBooks } from "../../../actions/libraryActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../css/library/Library.css";
import { Link } from "react-router-dom";

const Library = ({ library: { books }, getPopularBooks }) => {
  useEffect(() => {
    async function fetchData() {
      await getPopularBooks();
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPopularBooks]);

  return (
    <div>
      <Header page='header__library' />
      <Carouser className='library__carousel' />
      <div className='library__main-div container'>
        <h1 className='bookDetails__sub-title'>
          <span>Most </span> Popular
        </h1>
        <div
          style={{
            maxHeight: "50rem",
            overflow: "hidden",
            paddingTop: "5rem",
          }}>
          <div className='library__popular-div'>
            {books &&
              books.map((book, index) => (
                <Link to={`/library/book/${book.bookId}`} className='library__popular-books-main-div'>
                  <div key={index} className='library__popular-books-div'>
                    <img src={book.bookImage} alt='book-img' />
                    <h4>
                      {book.title && book.title.length > 30
                        ? book.title.substring(0, 30) + " ..."
                        : book.title}
                    </h4>
                    <p>{book.authors[0]}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <FooterLarge />
    </div>
  );
};

Library.propTypes = {
  getPopularBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  library: state.library,
});

export default connect(mapStateToProps, {
  getPopularBooks,
})(Library);
