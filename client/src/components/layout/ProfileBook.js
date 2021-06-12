import React from "react";
import { Link } from "react-router-dom";
import "../../css/layout/ProfileBook.css";
import dateFormat from "dateformat";

const ProfileBook = ({ books,user }) => {
  return (
    <div>
      <div className='profileBook__main-div'>
        {books.map((book, index) => (
          <div key={index} className='profileBook__book-div'>
            <div className='profileBook__book-img'>
              <img alt='book-img' src={book.bookImage}></img>
            </div>
            <div className='profileBook__book-body'>
              <p><p>Title: </p><span>{book.title}</span></p>
              <p><p>Borrowed on: </p><span>{dateFormat(book.userBorrowedOn, "fullDate")}</span></p>
              <p><p>Return Date: </p><span>{dateFormat(book.userReturnedOn, "fullDate")}</span></p>
              <p><p>Current borrower: </p><span>{book.borrowerName ? book.borrowerName : "-"}</span></p>
              <p><p>Availability: </p><span style={{color: book.availability ? "green" : "orangered", fontWeight: "900"}} >{book.availability ? "True" : "False"}</span></p>
              <Link
                key={index}
                to={`/library/book/${book.bookId}`}
                className='profileBook__book-link'>
                <button className="btn btn-info" style={{marginTop:"1rem",width:"15rem"}}>More Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {books.length === 0 && (
        <div>
          <h3 className='profileForm__no-posts'>{user.name} did not borrow any books!</h3>
        </div>
      )}
    </div>
  );
};

export default ProfileBook;
