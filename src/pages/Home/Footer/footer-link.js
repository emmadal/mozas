import React from "react"
import { Row, Col } from "reactstrap"

//Import Images
import logolight from "assets/images/logo-light.png"

const FooterLink = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="6">
          <div className="mb-4">
            <img src={logolight} alt="" height="77" />
          </div>

          <p className="mb-2">
            {new Date().getFullYear()} © <strong>Mozah Invest</strong>.
          </p>
          <p>
            Plateforme innovante d&#39;investissement participative sur des
            projets couplée à la finance digitale.
          </p>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default FooterLink
