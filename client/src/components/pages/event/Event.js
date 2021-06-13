import Header from "../../layout/Header";
import React from "react";
import FooterLarge from "../../layout/FooterLarge";
import { Carousel } from "react-bootstrap";

import "../../../css/events/Event.css";

const Event = () => {
  return (
    <div>
      <div className='event__main-div'>
        <Header page='header__event' />

        <Carousel>
          <Carousel.Item>
            <img
              className='d-block w-100'
              style={{ height: "50rem" }}
              src='https://cdn.pixabay.com/photo/2020/01/15/17/38/fireworks-4768501_1280.jpg'
              alt='First slide'
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "50rem" }}
              className='d-block w-100'
              src='https://cdn.pixabay.com/photo/2015/11/30/23/32/champagner-1071356_1280.jpg'
              alt='Second slide'
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "50rem" }}
              className='d-block w-100'
              src='https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg'
              alt='Third slide'
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className='container'>
          <div style={{ margin: "15rem 0 5rem" }}>
            <h1>Events</h1>
          </div>
          <ul className='timeline'>
            {Array.from({ length: 8 }).map((_, index) => (
              <li key={index}>
                <div className='event__timeline'>
                  <div className='timeline-time'>
                    <span className='date'>
                      <p>Date {index + 1}</p>
                    </span>
                    <span className='time'>
                      <p>Date {index + 1}</p>
                    </span>
                  </div>
                  <div className='timeline-icon'>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>&nbsp;</a>
                  </div>
                </div>
                <div className='timeline-body1 box-shadow-3'>
                  <div className='event__event-div'>
                    <div className='event__event-details'>
                      <h3>Event Title</h3>
                      <h6>
                        Quisque ut nisl augue. Suspendisse consequat, turpis id
                        feugiat tristique, sem leo consequat purus, sed
                        malesuada felis nisi in nulla...
                      </h6>
                      <p>
                        <i className='far fa-clock'></i> 10Am - 6PM
                      </p>
                      <p>
                        <i className='fas fa-map-marker-alt'></i> Event Location
                      </p>
                    </div>
                    <div className='event__event-img-div'>
                      <img
                        className='event__event-img'
                        src='https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg'
                        alt='event img'></img>
                    </div>
                    <button className='event__event-register'>
                      Register For Event
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <FooterLarge />
    </div>
  );
};

export default Event;
