import React from "react"
import { Container, Row, Col } from "reactstrap"

//Import Pricing Cards
import CardPricing from "./card-pricing"

const Pricing = () => {
  const pricings = [
    {
      id: 1,
      title: "STANDARD",
      description: "20% de Retour sur investissement ",
      icon: "bx-check-shield",
      price: "100 - 750 euros",
      duration: "Par investissement",
      link: "/login",
      features: [
        { title: "100 Tokens offerts" },
        { title: "100% de Rendement totaux" },
        { title: "12% de la valeur du Token / an en USDT" },
      ],
    },
    {
      id: 2,
      title: "PREMIUM",
      description: "25% de retour sur investissement",
      icon: "bx-star",
      price: "800 - 2500 euros",
      duration: "Par investissement",
      link: "/login",
      features: [
        { title: "300 Tokens offerts" },
        { title: "125% de Rendement totaux" },
        { title: "20% de la valeur du Token/ an en USDT" },
      ],
    },
    {
      id: 3,
      title: "GOLD",
      description: "30% de retour sur investissement",
      icon: "bx-diamond",
      price: "2750 - 10000 euros",
      duration: "Par investissement",
      link: "/login",
      features: [
        { title: "500 Token offerts" },
        { title: "150% de Rendement totaux" },
        { title: "30% de la valeur du Token/ an en USDT" },
      ],
    },
  ]
  return (
    <React.Fragment>
      <section className="py-5 fade-in-image">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center mb-5">
                <p className="fs-2 fw-light">Notre plan d&#39;investissement</p>
                <p className="fs-3 fw-bold">
                  Aider les investisseurs à choisir le meilleur investissement.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {pricings.map((pricing, key) => (
              <CardPricing pricing={pricing} key={"_pricing_" + key} />
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}
export default Pricing
