import React from "react";
import { Link } from "react-router-dom";
import "../../css/layout/ProfileBook.css";
import dateFormat from "dateformat";

const ProfileBook = ({ books,user }) => {
  return (
    <div>
      <div className='profileBook__main-div'>
        {books.map((book, index) => (
          <div className='profileBook__book-div'>
            <div className='profileBook__book-img'>
              <img alt='book-img' src={book.bookImage}></img>
            </div>
            <div className='profileBook__book-body'>
              <p><p>Title: </p><span>{book.title}</span></p>
              <p><p>Borrowed by: </p><span>{book.borrowerName}</span></p>
              <p><p>Borrowed on: </p><span>{dateFormat(book.borrowStartDate, "fullDate")}</span></p>
              <p><p>Return date: </p><span>{dateFormat(book.borrowEndDate, "fullDate")}</span></p>
              <p><p>Availability: </p><span style={{color: book.availability ? "green" : "orangered", fontWeight: "900"}} >{book.availability ? "True" : "False"}</span></p>
              <Link
                key={index}
                to={`/library/book/${book.bookId}`}
                className='profileBook__book-link'>
                <button className="btn btn-info">View</button>
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
