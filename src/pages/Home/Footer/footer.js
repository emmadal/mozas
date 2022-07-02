import React from "react"
import { Container } from "reactstrap"

//Import Components
import FooterLink from "./footer-link"

const Features = () => {
  return (
    <React.Fragment>
      <footer className="landing-footer">
        <Container>
          <FooterLink />
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Features
