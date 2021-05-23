import React from "react";
import Header from "../../layout/Header";
import "../../../css/others/FAQ.css";
import { Col, Row, Container } from "react-bootstrap";
import FooterLarge from "../../layout/FooterLarge";

const FAQ = () => {
  return (
    <div>
      <div className='faq__main-div'>
        <Header />
        <Container fluid className='faq__main-container'>
          <Col className='faq__main-col'>
            <Row className='faq__title'>
              <h1>Frequently Asked Questons</h1>
            </Row>
            <Row>
              <div className='faq__steps-main-div'>
                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 1</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      {" "}
                      How do I access my Student Portal?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      Students who have already registered themselves can use
                      their student mail id and password to login to their
                      portal. If you are a new user, click on “registration” in
                      the menu and create an account using your Full name,
                      student mail id and set a password.
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 2</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      What do I do if I forget my Password?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      If you have forgotten your password, please do the
                      following:
                      <ol>
                        <li>
                          Go to <strong><a href="https://musp.herokuapp.com/login">https://musp.herokuapp.com/login</a></strong> then click
                          'Forgot password'
                        </li>
                        <li>
                          Enter your student mail Id with which you registered
                        </li>
                        <li>
                          You will receive an email from
                          mec.studentportal@gmail.com , open the email and click
                          on ‘Change password’.
                        </li>
                        <li>
                          You will be redirected to a page where you will have
                          to enter your new password and then click 'Reset
                          Password’.
                        </li>
                        <li>Your password has now been changed </li>
                      </ol>
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 3</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      Can I register with my personal mail id?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      No. Your personal institution email address is the unique
                      email address supplied to you by your
                      school/college/university. <br></br>If you don’t have an
                      institution email address, then please contact the IT
                      department.
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 4</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      What will I find in the Student Portal?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      This portal is designed to help you communicate with
                      fellow students from Mahindra University. You will be able
                      to:
                      <ul>
                        <li>
                          Forum page: an intuitive platform that facilitates
                          online Q&A discussions. Users can view, reply, search,
                          create forms.
                        </li>
                        <li>
                          Library page: user can search for a book to know its
                          current status (Borrowed, Available). If the book is
                          already borrowed, the user can send a request to the
                          borrower to ask him if he can lend his book for a
                          short amount of time.
                        </li>
                        <li>
                          Event page: It has a timetable along with a calendar
                          with all the events marked on it. The website sends
                          the user an alert whenever they have a class
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 5</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      Can I post questions as an anonymous user in the forum
                      page?
                    </h1>
                    <p className='faq__steps-p'>
                      No. Information such as the user's name, day and date will
                      be displayed for all questions that are posted. Anonymity
                      feature has been excluded to prevent users from posting
                      inappropriate content.
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 6</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      How do I borrow a book from the library?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      Please do the following:
                      <ol>
                        <li>
                          Go to <a href="https://musp.herokuapp.com/library">https://musp.herokuapp.com/library</a> or click on
                          “library” in the navigation bar.
                        </li>
                        <li>
                          Click on “Start browsing” and search for a specific
                          book.
                        </li>
                        <li>
                          All books matching your search will be displayed.
                          Click on the book you would like to borrow.
                        </li>
                        <li>
                          Description of the book and its availability will be
                          displayed. If availability is true. Click on “Borrow”.
                          A pop-up message will be displayed with information
                          such as duration, renewal etc.
                        </li>
                        <li>
                          Go to the college library and collect your book.{" "}
                        </li>
                        <li>
                          If the availability is “false”, click on “Borrow”. A
                          pop-up message I displayed asking permission to notify
                          borrowers if they can lend the book. Click on send
                          requests if you wish to do so.
                        </li>
                      </ol>
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 7</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      How can I Re-borrow a book?
                    </h1>
                    <p className='faq__steps-p'>
                      If you want to re-borrow/ renew a book visit the book page
                      again and click on the re-borrow button which you can only
                      see when your borrowed period is over. Please return the
                      book by going to the library once you have finished with
                      the book.
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 8</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      How can I place a request for an unavailable book?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      If the availability status of a book that you would like
                      to borrow is “false”, click on “borrow”. A pop-up message
                      is displayed asking if you would like to send requests to
                      the current borrowers.
                      <ol>
                        <li>
                          Click on “send requests”. ON doing so all the current
                          borrowers will receive a notification.
                        </li>
                        <li>
                          You will receive a notification if the current
                          borrower accepts or rejects your request.
                        </li>
                      </ol>
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 9</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      How can I return a book?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      If you wish to be removed from the borrower queue you can
                      either not collect the book from the library within a day
                      or inform them that you do not wish to borrow this book.
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 10</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      How long can a book be checked out?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      Books are loaned for a period of 2 weeks i.e., 14 days.
                      Please go to the library and collect your book within a
                      day or else you will be removed from the borrower queue
                      and have to apply again.
                    </p>
                  </div>
                </div>

                <div className='faq__steps-div'>
                  <div className='faq__steps-question-div'>
                    <div className='faq__steps-question'>
                      <p>Question 11</p>
                    </div>
                  </div>
                  <div className='faq__steps-content-div'>
                    <h1 className='faq__steps-title'>
                      I haven’t received a verification email, what do I do?
                    </h1>
                    <p className='faq__steps-p'>
                      {" "}
                      Confirmation emails are generally sent out instantly. If
                      you haven't received one yet, please try the following:
                      <ol>
                        <li>
                          Check your spam or junk folder and any other tabs in
                          your inbox to make sure it didn't end up there by
                          accident.
                        </li>
                        <li>
                          If you still haven't received a verification mail then
                          please contact us @ <span style={{color:"red"}}>mec.studentportal@gmail.com</span> and
                          we’ll do our best to resolve this issue..
                        </li>
                      </ol>
                    </p>
                  </div>
                </div>
              </div>
            </Row>
          </Col>
        </Container>
      </div>
      <FooterLarge />
    </div>
  );
};

export default FAQ;
