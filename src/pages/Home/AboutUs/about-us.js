import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

//Images
import client1 from "assets/images/clients/1.png";
import client2 from "assets/images/clients/2.png";
import client3 from "assets/images/clients/3.png";
import client4 from "assets/images/clients/4.png";
import client5 from "assets/images/clients/5.png";
import client6 from "assets/images/clients/6.png";
import financial from "assets/images/mozah/financial-grow.jpeg";

const AboutUs = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  return (
    <React.Fragment>
      <section className="section pt-4 bg-white" id="about">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="fs-2 fw-light">Qui sommes nous</div>
                <p className="fs-3 fw-bold">Notre Histoire</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <div className="about-image">
                <img src={financial} className="img-fluid rounded" />
              </div>
            </Col>
            <Col sm={6}>
              <div className="mt-4 mt-lg-0 about-content">
                <h1 className="fw-bold">
                  L&#39;investissement le plus rentable.
                </h1>
                <p className="fs-5 text-muted text-justify">
                  <strong>Mozah Invest</strong> est une plateforme innovante
                  d&#39;investissement participative sur des projets couplés à
                  la finance digitale. Une solution pour tous ceux qui sont
                  déçus d&#39;investir dans des projets sans rentabilité sur le
                  long terme. <strong>Mozah Invest</strong> vient se positionner
                  comme le leader des projets à financement participatif conçu
                  par des experts afin d&#39;offrir aux investisseurs des
                  projets à fort taux de rentabilité avec un retour sur
                  investissement allant de 10 à 25 % l&#39;année.
                </p>
                <p className="fs-5 text-muted text-justify">
                  Notre vision est de construire un écosystème de projets
                  rentables avec les membres de notre communauté pour se bâtir
                  une indépendante financière ou chaque membre touchera des
                  commissions sur tous les projets de l&#39écosystème sur une
                  chaîne de génération.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
};

export default AboutUs;
