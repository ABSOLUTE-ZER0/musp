import React from "react";
import "../../css/layout/FooterLarge.css";


const FooterLarge = () => {
  return (
    <div style={{paddingTop: "30rem"}} className="footerLarge-body">
      <div className='footerLarge-container-fluid pb-0 mb-0 justify-content-center text-light '>
        <footer>
          <div className='row my-5 justify-content-center py-5'>
            <div className='col-11'>
              <div className='row '>
                <div className='col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a'>
                  <h3 className='text-muted mb-md-0 mb-5 bold-text h3'>MUSP</h3>
                </div>
                <div className='col-xl-2 col-md-4 col-sm-4 col-12'>
                  <h4 className='mb-3 mb-lg-4 bold-text '>
                    <b>MENU</b>
                  </h4>
                  <div className='footerLarger__link-div'>
                    <p><a href="/">Home</a></p>
                    <p><a href="/library">Library</a></p>
                    <p><a href="/faq">FAQs</a></p>
                    <p><a href="/contact">Contact</a></p>
                  </div>
                </div>
                <div className='col-xl-2 col-md-4 col-sm-4 col-12'>
                  <h4 className='mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5'>
                    <b>ADDRESS</b>
                  </h4>
                  <p className='mb-1'>1A Survey No: 62, Bahadurpally</p>
                  <p>Hyderabad, Telangana 500043</p>
                </div>
              </div>
              <div className='row '>
                <div className='col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end'>
                  <p className='social text-muted mb-0 pb-0 bold-text'>
                    {" "}
                    <span className='mx-2'>
                      <i className='fa fa-facebook' aria-hidden='true'></i>
                    </span>{" "}
                    <span className='mx-2'>
                      <i className='fa fa-linkedin-square' aria-hidden='true'></i>
                    </span>{" "}
                    <span className='mx-2'>
                      <i className='fa fa-twitter' aria-hidden='true'></i>
                    </span>{" "}
                    <span className='mx-2'>
                      <i className='fa fa-instagram' aria-hidden='true'></i>
                    </span>{" "}
                  </p>
                  <small className='rights'>
                    <span>&#174;</span> MUSP All Rights Reserved.
                  </small>
                </div>
                <div className='col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end '>
                  <h4 className='mt-55 mt-2 text-muted bold-text'>
                    <b>ABSOLUTE ZERO</b>
                  </h4>
                  <small>
                    {" "}
                    <span>
                      <i className='fa fa-envelope' aria-hidden='true'></i>
                    </span>{" "}
                    sricharan.thummala@gmail.com
                  </small>
                </div>
                <div className='col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 '>
                  <h4 className='text-muted bold-text'>
                    <b>MUSP TEAM</b>
                  </h4>
                  <small>
                    <span>
                      <i className='fa fa-envelope' aria-hidden='true'></i>
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
