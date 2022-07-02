import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

//Import Countdown
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>You are good to go!</span>;
  } else {
    // Render a countdown
    return (
      <>
        <div className="coming-box">
          {days}
          <span>Days</span>
        </div>
        <div className="coming-box">
          {hours}
          <span>Hours</span>
        </div>
        <div className="coming-box">
          {minutes}
          <span>Minutes</span>
        </div>
        <div className="coming-box">
          {seconds}
          <span>Seconds</span>
        </div>
      </>
    );
  }
};

const Section = () => {
  return (
    <React.Fragment>
      <section className="section hero-section bg-ico-hero" id="home">
        <div className="bg-overlay bg-primary" />
        <Container>
          <Row className="align-items-center">
            <Col>
              <div className="text-white-50">
                <h1 className="text-white font-weight-semibold mb-3 hero-title">
                  MEILLEUR PLAN POUR INVESTIR DANS DES PROJETS VIABLES
                </h1>
                <p className="font-size-20 fs-6">
                  Rejoignez les investisseurs pour faire fructifier votre
                  patrimoine.
                </p>

                <div className="d-flex flex-wrap gap-2 mt-4">
                  {/* <Link to="#" className="btn btn-success me-1">
                    Get Whitepaper
                  </Link> */}
                  <Link to="/register" className="btn btn-light btn-lg">
                    Investissez maintenant !
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
};

export default Section;
