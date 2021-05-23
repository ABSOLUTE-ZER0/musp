import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import Header from "../../layout/Header";
import FooterLarge from "../../layout/FooterLarge";
import "../../../css/others/Contact.css";

const About = () => {
  return (
    <div className='contact__main-div'>
      <Header />
      <div className='contact__img'></div>
      <Container>
        <Col className='contact__main-col'>
          <Row>
            <h4 className='contact__title'>Get In Touch</h4>
            <p className='contact__desc'>
              Do you have any Queries or looking for any other
              information. Fill out the form below and we will get back to you
              at the earliest.
            </p>
          </Row>
        </Col>
        <Row style={{ marginTop: "2rem" }}>
          <Col className='contact__input-col' lg='6'>
            <div className='contact__input-div'>
              <input
                className='contact__input'
                type='text'
                placeholder='Name'
                autoComplete="off"></input>
            </div>
            <div className='contact__input-div'>
              <input
                className='contact__input'
                type='text'
                placeholder='Email ID'
                autoComplete="off"></input>
            </div>
            <div className='contact__input-div'>
              <input
                className='contact__input'
                type='text'
                placeholder='Mobile Number'
                autoComplete="off"></input>
            </div>
            <div className='contact__input-div'>
              <input
                className='contact__input'
                type='text'
                placeholder='Country'
                autoComplete="off"></input>
            </div>
            <div className='contact__input-div'>
              <textarea
                no-resize
                className='contact__input'
                type='text-area'
                placeholder='Message'
                autoComplete="off"></textarea>
            </div>
            <div className="contact__button-div">
              <Button variant="" className='contact__submit-btn'>Submit</Button>
            </div>
          </Col>
          <Col lg='6'>
            <div className="contact__details-div">
              <div>
                <div className='contact__title1'>
                  {" "}
                  <i className='fa fa-envelope' aria-hidden='true'></i> Connect
                  with Us
                </div>
                <p>
                  For Support, information or Queries email us at <br></br>
                  <p><strong>mec.studentportal@gmail.com</strong></p>{" "}
                </p>
              </div>
              <div>
                <div className='contact__title1'>
                  <i className='fa fa-phone-square' aria-hidden='true'></i>{" "}
                  Please call Us at
                </div>
                <p>+91 *** *** ****, +91 *** *** ****</p>
              </div>
              <div>
                <div className='contact__title2'>GLOBAL HEADQUARTER</div>
                <p><strong>MUSP</strong></p>
                <p>1A Survey No: 62, Bahadurpally</p>
                <p>Hyderabad, Telangana 500043</p>
              </div>
              <div>
                <div className='contact__title2'>GALATIC HEADQUATER</div>
                <p>On the freaking MOON</p>
                <p>Deal with it!</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <FooterLarge />
    </div>
  );
};

export default About;
