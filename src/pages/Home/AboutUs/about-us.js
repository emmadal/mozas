import React from "react";
import { Container, Row, Col } from "reactstrap";
import financial from "assets/images/mozah/financial-grow.jpeg";

const AboutUs = () => {
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
                  Notre vision est de construire un écosystème des projets
                  rentables et non louables avec les membres de notre communauté pour se bâtir
                  une indépendance financière ou chaque membre touchera des
                  commissions durant une chaîne de production sur tous les projets de l&#39;écosystème.
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
