import React from "react"
import { Container, Row, Col } from "reactstrap"

const ChooseUs = () => {
  return (
    <React.Fragment>
      <div className="ds page_contact background_cover section_padding_100 py-5">
        <Container>
          <Row>
            <Col sm={12}>
              <div className="section-headline text-center mt-5">
                <h3 className="text-white">Pourquoi choisir Mozah Invest ?</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <div className="support-services">
                <span className="top-icon">
                  <i className="bx bx-spreadsheet"></i>
                </span>
                <a className="support-images" href="#">
                  <i className="bx bx-spreadsheet"></i>
                </a>
                <div className="support-content">
                  <h4 className="text-white fw-bold">
                    Financement de projets participatif
                  </h4>
                  <p className="text-white lead">
                    Une solution pour ceux qui sont en quête d&#39;une
                    indépendance financière. Les souscription aux pôles de
                    projets de Mozah invest ont une durée de 5 minimum pour vous
                    dire que nous visons le long terme.
                  </p>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className="support-services">
                <span className="top-icon">
                  <i className="bx bx-check-shield"></i>
                </span>
                <a className="support-images" href="#">
                  <i className="bx bx-check-shield"></i>
                </a>
                <div className="support-content">
                  <h4 className="text-white fw-bold">L&#39;Ecosystème</h4>
                  <p className="text-white lead">
                    Pôle de projets innovant avec un fort taux de rentabilité ou
                    les investisseurs deviendront des membres de la communauté
                    et toucheront des commissions sur l&#39;ensemble des projets
                    de l&#39;écosystème.
                  </p>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className="support-services">
                <span className="top-icon">
                  <i className="bx bx-diamond"></i>
                </span>
                <a className="support-images" href="#">
                  <i className="bx bx-diamond"></i>
                </a>
                <div className="support-content">
                  <h5 className="text-white fw-bold">
                    Finance digitale cryptomonnaie.
                  </h5>
                  <p className="text-white lead">
                    Adossée à un Token Utilitaire pour créer une communauté ou
                    chaque membre recevra selon sa souscription des Tokens à
                    épagner sur 12 mois et gagner 12% de la valeur du Token
                    selon le marché en USDT.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <div className="support-services">
                <span className="top-icon">
                  <i className="bx bx-money"></i>
                </span>
                <a className="support-images" href="#">
                  <i className="bx bx-money"></i>
                </a>
                <div className="support-content">
                  <h5 className="text-white fw-bold">Vos investissements</h5>
                  <p className="text-white lead">
                    Faîtes votre choix parmi les projets proposés et participez
                    à partir de 100 euros. Visualisez vos futurs paiements et
                    validez vos souscriptions en ligne par Paypal.
                  </p>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div className="support-services">
                <span className="top-icon">
                  <i className="bx bx-archive-in"></i>
                </span>
                <a className="support-images" href="#">
                  <i className="bx bx-archive-in"></i>
                </a>
                <div className="support-content">
                  <h5 className="text-white fw-bold">Vos remboursements</h5>
                  <p className="text-white lead">
                    Vous recevez vos interêts et vos remboursements dans votre
                    portefeuille de paiement. Vous pouvez réinvestir ou virer
                    votre gain vers votre compte bancaire.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ChooseUs
