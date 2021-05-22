import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { removeModal } from "../../actions/modalActions";
import { lendBook } from "../../actions/libraryActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/layout/BorrowModal.css";


import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  forceRefresh: true,
});

const BorrowModal = ({ modal, removeModal, library: {book}, lendBook, user}) => {
  const [show, setShow] = useState(null);

  if (modal.borrow && !show) {
    setShow(modal.borrow);
  }

  const handleClose = () => {
    removeModal();
    setShow(null);
    history.push(`/library/book/${book.bookId}`);
  };

  const requestToLend = async() => {
    lendBook(book.borrowedBy , user.name , book.title)
    removeModal();
    history.push(`/library/book/${book.bookId}`);
  }

  return (
    <div>
      <Modal
        show={show === "borrow"}
        onHide={handleClose}
        backdrop='static'
        className="borrowModal__modal"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Request to borrow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have requested to borrow the following book for 14 days. Please go
          to the library and collect your book within a day or else you will be
          removed from the borrower queue and have to apply again! If you want
          to re-borrow the book visit the book page again and click on the
          re-borrow button which you can only see when your borrowed period is
          over. Please return the book by going to the library once you have
          finished with the book.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant='primary'>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show === "reBorrow"}
        onHide={handleClose}
        backdrop='static'
        className="borrowModal__modal"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Request to re-borrow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have requested to re-borrow the following book for another 14
          days. If you wish to return the book go to the library and do so.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant='primary'>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show === "notAvailable"}
        onHide={handleClose}
        backdrop='static'
        className="borrowModal__modal"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Request to lend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The following book is already borrowed by {book.borrowerName}. You can send
          him a message from here requesting him to lend you the book for a day
          or two!
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant='danger'>
            Close
          </Button>
          <Button onClick={requestToLend} variant='primary'>Request to lend</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show === "borrowed"}
        onHide={handleClose}
        backdrop='static'
        className="borrowModal__modal"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Request to un-borrow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you wish to be removed from the borrower queue you can either not
          collect the book from the library within a day or inform them that you
          do not wish to borrow this book.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant='primary'>
          Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

BorrowModal.propTypes = {
  modal: PropTypes.object,
  removeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  library: state.library,
  user: state.auth.user,
});

export default connect(mapStateToProps, { removeModal, lendBook })(BorrowModal);
