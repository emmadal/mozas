import React from "react"
import { Container, Row } from "reactstrap"

//Import Components
import CardBox from "./card-box"

const CardsMini = () => {
  const coins = [
    {
      title: "Investissements",
      color: "warning",
      icon: "bx bx-money",
      value: "7483920 €",
    },
    {
      title: "Investisseurs",
      color: "primary",
      icon: "bx bx-user",
      value: "150",
    },
    {
      title: "Plusieurs Pays",
      color: "info",
      icon: "bx bx-globe",
      value: "05",
    },
  ]

  return (
    <React.Fragment>
      <section className="section bg-white p-0">
        <Container>
          <div className="currency-price">
            <Row>
              {/* reder card boxes */}
              <CardBox coins={coins} />
            </Row>
          </div>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CardsMini
