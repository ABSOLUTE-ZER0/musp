import React, { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../layout/Header";

import "../../../css/library/BookDetails.css";
import { getBook } from "../../../actions/libraryActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const BookDetails = ({ getBook, library: { book } }) => {
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      await getBook(id);
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBook]);

  return (
    book && (
      <div>
      <Header page='header__library' />
        <div className='bookDetails__main-div'>
          <div className='bookDetails__background'>
            <div className='bookDetails__book-background'>
              <img
                src={book.bookImage}
                alt='Book Img'
              />
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  library: state.library,
});

export default connect(mapStateToProps, {
  getBook,
})(BookDetails);
