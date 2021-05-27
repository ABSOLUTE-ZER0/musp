import React, { useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
import img1 from "../../images/library/Optimized-library1.jpg";
import img2 from "../../images/library/Optimized-library2.jpg";
import img3 from "../../images/library/Optimized-library3.jpg";
import img4 from "../../images/library/Optimized-library4.jpg";
import "../../css/layout/LibraryCarousel.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alertActions";
import { openSearchPage } from "../../actions/libraryActions";
import Alert from "./Alert";

import {
  removeModal,
  showLibrarySearchModal,
} from "../../actions/modalActions";

const LibraryCarousel = ({
  removeModal,
  modal: { librarySearchModal },
  showLibrarySearchModal,
  setAlert,
  openSearchPage,
}) => {
  const [search, setSearch] = useState("");

  const searchClicked = async () => {
    if (!search || search === "") {
      return setAlert("Enter something to search", "warning");
    }

    const res = await openSearchPage(search);

    if (res && res.errors) {
      setAlert(res.errors[0].msg, "warning");
    }
  };

  return (
    <div className='libraryCarousel__carousel-div'>
      <Carousel className='libraryCarousel__carousel'>
        <Carousel.Item>
          <img
            className='d-block w-100 libraryCarousel__img'
            src={img1}
            alt='First slide'
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className='d-block w-100 libraryCarousel__img'
            src={img2}
            alt='First slide'
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className='d-block w-100 libraryCarousel__img'
            src={img3}
            alt='First slide'
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className='d-block w-100 libraryCarousel__img'
            src={img4}
            alt='First slide'
          />
        </Carousel.Item>
      </Carousel>
      <div className='libraryCarousel__overlay'>
        <h3 className='libraryCarousel__overlay-title'>
          Welcome to MU Library
        </h3>
        <h5 className='libraryCarousel__overlay-subtitle'>
          Borrowing made easy and efficient!!
        </h5>
        <button
          onClick={() => {
            showLibrarySearchModal();
          }}
          className='libraryCarousel__overlay-button'>
          Start browsing
        </button>
      </div>

      <Modal
        dialogClassName='libraryCarousel__search-dialog-modal'
        show={librarySearchModal}
        onHide={removeModal}
        contentClassName='libraryCarousel__search'>
        <div className='libraryCarousel__alert-div'>
          <Alert />
        </div>
        <button
          onClick={() => removeModal()}
          className='libraryCarousel__search-close'>
          <i className='fas fa-times'></i>
        </button>
        <h1>Search for your book here</h1>
        <input
          value={search}
          onChange={async (e) => await setSearch(e.target.value)}
          placeholder='Search...'
        />
        <div>
          <button
            onClick={() => removeModal()}
            className='libraryCarousel__close-button'>
            Close
          </button>
          <button
            onClick={searchClicked}
            className='libraryCarousel__search-button'>
            Search
          </button>
        </div>
      </Modal>
    </div>
  );
};

LibraryCarousel.propTypes = {
  modal: PropTypes.object,
  removeModal: PropTypes.func.isRequired,
  showLibrarySearchModal: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  openSearchPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, {
  removeModal,
  showLibrarySearchModal,
  setAlert,
  openSearchPage,
})(LibraryCarousel);
