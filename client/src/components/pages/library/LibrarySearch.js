import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../layout/Header";
import Book from "../../layout/Book";
import { connect } from "react-redux";
import { searchBooks } from "../../../actions/libraryActions";
import { loadUser } from "../../../actions/authActions";
import Loader from "../../layout/Loader";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { openSearchPage } from "../../../actions/libraryActions";
import { setAlert } from "../../../actions/alertActions";
import Alert from "../../layout/Alert"
import "../../../css/library/LibrarySearch.css";

const LibrarySearch = ({
  modal,
  auth: { user },
  searchBooks,
  loadUser,
  library,
  openSearchPage,
  setAlert
}) => {
  let { searchParam, pageParam } = useParams();
  const [search, setSearch] = useState(searchParam);

  useEffect(() => {
    async function fetchData() {
      await loadUser();
      await searchBooks(searchParam, pageParam);
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBooks]);

  const nextPageLick = () => {
    pageParam = parseInt(pageParam) + 1;
    openSearchPage(searchParam, pageParam);
  };

  const prevPageLick = () => {
    pageParam = parseInt(pageParam) - 1;
    openSearchPage(searchParam, pageParam);
  };

  const searchClicked = () => {
    if(search!==""){
      openSearchPage(search, 0);
    } else {
      setAlert("Enter something to search!","warning")
    }
  };

  const inputTyped = (e) => {
    const value = e.target.value 
    setSearch(value)
  };




  if (library.totalBooks) {
    if (
      parseInt(pageParam) > parseInt(library.totalBooks) ||
      parseInt(pageParam) < 0
    ) {
      openSearchPage(searchParam, 0);
    }
  }

  return (
    <div>
      <Header page='header__library' />
      <div className='container libSearch__main-div'>
        <div className='libSearch__main-div'>
          <Alert />
          <div className='libSearch__search-div'>
            <input
              value={search}
              onChange={inputTyped}
              placeholder='Search...'
            />
            <button
              onClick={searchClicked}
              className='libSearch__search-button'>
              Search
            </button>
          </div>
          {library.totalBooks && (
            <div className='libSearch__button-div'>
              {pageParam > 0 && (
                <button onClick={prevPageLick} className='libSearch__button'>
                  <i className='fas fa-chevron-left'></i> Prev
                </button>
              )}
              {parseInt(pageParam) < parseInt(library.totalBooks) / 20 && (
                <button onClick={nextPageLick} className='libSearch__button'>
                  Next <i className='fas fa-chevron-right'></i>
                </button>
              )}
            </div>
          )}
        </div>
        <div className='libSearch__books-div'>
          {library.booksIsLoading ? (
            <Loader />
          ) : (
            library.books &&
            library.books.map((book, index) => (
              <Link
                key={index}
                to={`/library/book/${book.id}`}
                className='libSearch__book'>
                <Book book={book} />
              </Link>
            ))
          )}
        </div>
        {library.totalBooks && (
          <div className='libSearch__button-div'>
            {pageParam > 0 && (
              <button onClick={prevPageLick} className='libSearch__button'>
                <i className='fas fa-chevron-left'></i> Prev
              </button>
            )}
            {parseInt(pageParam) < parseInt(library.totalBooks) / 20 && (
              <button onClick={nextPageLick} className='libSearch__button'>
                Next <i className='fas fa-chevron-right'></i>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

LibrarySearch.propTypes = {
  searchBooks: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  openSearchPage: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  auth: state.auth,
  library: state.library,
});

export default connect(mapStateToProps, {
  searchBooks,
  loadUser,
  openSearchPage,
  setAlert
})(LibrarySearch);