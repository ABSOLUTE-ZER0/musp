import React from "react";
import "../../css/layout/FooterLarge.css";


const FooterLarge = () => {
  return (
    <div className="footerLarge-body">
      <div class='footerLarge-container-fluid pb-0 mb-0 justify-content-center text-light '>
        <footer>
          <div class='row my-5 justify-content-center py-5'>
            <div class='col-11'>
              <div class='row '>
                <div class='col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a'>
                  <h3 class='text-muted mb-md-0 mb-5 bold-text h3'>MUSP</h3>
                </div>
                <div class='col-xl-2 col-md-4 col-sm-4 col-12'>
                  <h4 class='mb-3 mb-lg-4 bold-text '>
                    <b>MENU</b>
                  </h4>
                  <ul class='list-unstyled'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Portfolio</li>
                  </ul>
                </div>
                <div class='col-xl-2 col-md-4 col-sm-4 col-12'>
                  <h4 class='mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5'>
                    <b>ADDRESS</b>
                  </h4>
                  <p class='mb-1'>1A Survey No: 62, Bahadurpally</p>
                  <p>Hyderabad, Telangana 500043</p>
                </div>
              </div>
              <div class='row '>
                <div class='col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end'>
                  <p class='social text-muted mb-0 pb-0 bold-text'>
                    {" "}
                    <span class='mx-2'>
                      <i class='fa fa-facebook' aria-hidden='true'></i>
                    </span>{" "}
                    <span class='mx-2'>
                      <i class='fa fa-linkedin-square' aria-hidden='true'></i>
                    </span>{" "}
                    <span class='mx-2'>
                      <i class='fa fa-twitter' aria-hidden='true'></i>
                    </span>{" "}
                    <span class='mx-2'>
                      <i class='fa fa-instagram' aria-hidden='true'></i>
                    </span>{" "}
                  </p>
                  <small class='rights'>
                    <span>&#174;</span> MUSP All Rights Reserved.
                  </small>
                </div>
                <div class='col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end '>
                  <h4 class='mt-55 mt-2 text-muted bold-text'>
                    <b>ABSOLUTE ZERO</b>
                  </h4>
                  <small>
                    {" "}
                    <span>
                      <i class='fa fa-envelope' aria-hidden='true'></i>
                    </span>{" "}
                    sricharan.thummala@gmail.com
                  </small>
                </div>
                <div class='col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 '>
                  <h4 class='text-muted bold-text'>
                    <b>MUSP TEAM</b>
                  </h4>
                  <small>
                    <span>
                      <i class='fa fa-envelope' aria-hidden='true'></i>
                    </span>{" "}
                    mec.studentportal@gmail.com
                  </small>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FooterLarge;
