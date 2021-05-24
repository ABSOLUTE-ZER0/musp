import React, { useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import Header from "../../layout/Header";
import FooterLarge from "../../layout/FooterLarge";
import "../../../css/others/Contact.css";
import API from "../../../api";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alertActions";
import Alert from "../../layout/Alert";

const About = ({ setAlert }) => {
  const [mailData, setMailData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInput = (e) => {
    setMailData({ ...mailData, [e.target.name]: e.target.value });
  };

  const sendMail = async () => {
    const { name, email, subject, message } = mailData;
    const res = await API.post("/api/general/selfmail", {
      name,
      email,
      subject,
      message,
    });

    if (res.data.errors) {
      setAlert(res.data.errors[0].msg, "warning");
    } else {
      setAlert("Message sent! We will get back to you shortly", "success");
    }
  };

  return (
    <div className='contact__main-div'>
      <Header />
      <div className='contact__img'></div>
      <Container>
        <div>
          <Alert />
        </div>
        <Col className='contact__main-col'>
          <Row>
            <h4 className='contact__title'>Get In Touch</h4>

            <p className='contact__desc'>
              Do you have any Queries or looking for any other information. Fill
              out the form below and we will get back to you at the earliest.
            </p>
          </Row>
        </Col>

        <Row style={{ marginTop: "2rem" }}>
          <Col className='contact__input-col' lg='6'>
            <div className='contact__input-div'>
              <input
                value={mailData.name}
                name='name'
                onChange={handleInput}
                className='contact__input'
                type='text'
                placeholder='Name'
                autoComplete='off'></input>
            </div>
            <div className='contact__input-div'>
              <input
                value={mailData.email}
                name='email'
                onChange={handleInput}
                className='contact__input'
                type='text'
                placeholder='Email ID'
                autoComplete='off'></input>
            </div>
            <div className='contact__input-div'>
              <input
                value={mailData.subject}
                name='subject'
                onChange={handleInput}
                className='contact__input'
                type='text'
                placeholder='Subject'
                autoComplete='off'></input>
            </div>
            <div className='contact__input-div'>
              <textarea
                value={mailData.message}
                name='message'
                onChange={handleInput}
                rows={4}
                no-resize
                className='contact__input'
                type='text-area'
                placeholder='Message'
                autoComplete='off'></textarea>
            </div>
            <div className='contact__button-div'>
              <Button
                variant=''
                onClick={sendMail}
                className='contact__submit-btn'>
                Submit
              </Button>
            </div>
          </Col>
          <Col lg='6'>
            <div className='contact__details-div'>
              <div>
                <div className='contact__title1'>
                  {" "}
                  <i className='fa fa-envelope' aria-hidden='true'></i> Connect
                  with Us
                </div>
                <p>
                  For Support, information or Queries email us at <br></br>
                  <p>
                    <strong>mec.studentportal@gmail.com</strong>
                  </p>{" "}
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
                <p>
                  <strong>MUSP</strong>
                </p>
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

About.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(About);
