import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"

//Import Components
import Accordian from "./accordian"

const FAQs = () => {
  const [activeTab, setactiveTab] = useState("1")

  return (
    <React.Fragment>
      <section className="section bg-white" id="faqs">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="fs-2 fw-light">FAQs</div>
                <p className="fs-3 fw-bold">En savoir plus</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <div className="vertical-nav">
                <Row>
                  <Col lg="2" sm="4">
                    <Nav pills className="flex-column">
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          setactiveTab("1")
                        }}
                      >
                        <i className="bx bx-help-circle nav-icon d-block mb-2" />
                        <p className="font-weight-bold mb-0">
                          Questions Générale
                        </p>
                      </NavLink>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          setactiveTab("2")
                        }}
                      >
                        <i className="bx bx-timer d-block nav-icon mb-2" />
                        <p className="font-weight-bold mb-0">
                          Processus d&#39;investissement
                        </p>
                      </NavLink>
                    </Nav>
                  </Col>
                  <Col lg="10" sm="8">
                    <Card>
                      <CardBody>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1" id="buy">
                            <h4 className="card-title mb-4">
                              Questions Générale
                            </h4>

                            {/* accoridan */}
                            <Accordian
                              question1="QUI EST MOZAH INVEST ?"
                              answer1="Mozah Invest est une plateforme innovante d'investissement participative sur des projets couplés à la finance digitale. Une solution pour tous ceux qui sont déçus d'investir dans des projets sans rentabilité sur le long terme."
                              question2="POURQUOI MOZAH INVEST ?"
                              answer2="Mozah Invest vient se positionner comme le leader des projets à financement participatif conçu par des experts afin d'offrir aux investisseurs des projets à fort taux de rentabilité avec un retour sur investissement allant de 20 à 30 % l'année."
                              question3="QUELS SONT LES OBJETIFS DE MOZAH INVEST ?"
                              answer3="Notre vision est de construire un écosystème de projets rentables avec les membres de notre communauté pour bâtir une indépendance financière ou chaque membre touchera des commissions durant une chaîne de production sur tous les projets de l'écosystème."
                              question4="MOZAH INVEST ET LA CRYPTOMONAIE QUELLE OFFRE ?"
                              answer4="Finance digitale cryptomonnaie. Adossée à un Token Utilitaire pour créer une communauté ou chaque membre recevra gratuitement selon sa souscription des Tokens à épargner sur 12 mois et gagner des intérêts a partir de 20% de la valeur du Token selon le marché en USDT. Avoir un portefeuille METAMASK pour recevoir ses tokens."
                            />
                          </TabPane>

                          <TabPane tabId="2">
                            <h4 className="card-title mb-4">
                              Processus d&#39;investissement
                            </h4>

                            <Accordian
                              question1="COMMENT INVESTIR ?"
                              answer1="Pour investir c'est imple et sécurisé. Faîtes votre choix parmi les projets proposés et participez à partir de 100 euros. Visualisez vos futurs paiements et validez vos souscriptions en ligne par Paypal en toute sécurité"
                              question2="QUELLE EST LA DUREE D’INVESTISSEMENT ?"
                              answer2="La durée est de cinq (05) années minimum."
                              question3="QUELS SONT VOS GAINS, INTERETS ET REMBOURSEMENT ?"
                              answer3="Vous recevez vos intérêts et vos remboursements dans votre portefeuille de paiement. Vous pouvez réinvestir ou virer votre gain vers votre compte bancaire."
                            />
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default FAQs
