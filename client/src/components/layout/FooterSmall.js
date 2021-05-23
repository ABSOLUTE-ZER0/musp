import React from "react";
import "../../css/layout/FooterSmall.css";

const FooterSmall = () => {
  return (
    <footer id='dk-footer' class='footerSmall'>
      <div>
        <span>Copyright © 2021, MUSP</span>
      </div>
      <div class='footerSmall__menu'>
        <a href='/'>Home</a>
        <a href='/library'>Library</a>
        <a href='/faq'>FAQs</a>
        <a href='/contact'>Contact</a>
      </div>
    </footer>
  );
};

export default FooterSmall;
