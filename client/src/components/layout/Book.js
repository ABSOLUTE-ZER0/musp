import React from 'react'
import "../../css/layout/Books.css"


const Book = ({book}) => {

  const subtitleLength = 70;
  const titleLength = 50;

  return (
    <div className="book__main-div">
        <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null} alt="book-img" />
        <h1>{book.volumeInfo.title && book.volumeInfo.title.length > titleLength
              ? book.volumeInfo.title.substring(0, titleLength) + " ..."
              : book.volumeInfo.title}</h1>
        <h4>{book.volumeInfo.subtitle && book.volumeInfo.subtitle.length > subtitleLength
              ? book.volumeInfo.subtitle.substring(0, subtitleLength) + " ..."
              : book.volumeInfo.subtitle}</h4>
        <p>{book.volumeInfo.authors && book.volumeInfo.authors.map((author,index)=> (<span key={index}> {index !== 0 ? ", " : null}{author}</span>))}</p>
    </div>
  )
}

export default Book
