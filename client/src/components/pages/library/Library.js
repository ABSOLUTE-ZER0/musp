import React from 'react'
import Header from "../../layout/Header";
import Carouser from "../../layout/LibraryCarousel";

const Library = () => {
  return (
    <div>
      <Header page="header__library" />
      <Carouser className="library__carousel" />
    </div>
  );
}

export default Library
