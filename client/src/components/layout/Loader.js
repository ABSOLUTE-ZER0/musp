import React from "react";
import loader from "../../images/loader.gif";

const Loader = () => (
  <>
    <img
      src={loader}
      alt='loading...'
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </>
);

export default Loader;
