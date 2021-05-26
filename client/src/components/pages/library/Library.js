import React from 'react'
import Header from "../../layout/Header";
import Carouser from "../../layout/LibraryCarousel";
import FooterLarge from "../../layout/FooterLarge";

const Library = () => {
  return (
    <div>
      <Header page="header__library" />
      <Carouser className="library__carousel" />
      <div className="library__main-div container">
        <h1>Frequently borrowed books</h1>
      </div>
      <FooterLarge />
    </div>
  );
}

export default Library
