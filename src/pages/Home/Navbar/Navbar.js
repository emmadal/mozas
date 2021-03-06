import PropTypes from 'prop-types';
import React, { useState } from "react";
import {
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";

//Import Images
import logolight from "assets/images/logo-light.png";

const navItems = [
  { id: 1, idnm: "home", navheading: "Accueil" },
  { id: 2, idnm: "about", navheading: "Qui sommes nous" },
  { id: 5, idnm: "news", navheading: "Projets" },
  { id: 6, idnm: "faqs", navheading: "FAQs" },
];

const Navbar_Page = props => {
  const [isOpenMenu, setisOpenMenu] = useState(false);

  //Store all NavigationbaFr Id into TargetID variable(Used for Scrollspy)
  let TargetId = navItems.map(item => {
    return item.idnm;
  });

  return (
    <React.Fragment>
      <nav
        className={
          "navbar navbar-expand-lg navigation fixed-top sticky " +
          props.navClass
        }
      >
        <Container>
          <Link className="navbar-logo" to="/">
            <img
              src={logolight}
              alt=""
              height="77"
              // className="logo logo-light"
            />
          </Link>

          <NavbarToggler
            className="p-0"
            onClick={() => {
              setisOpenMenu(!isOpenMenu)
            }}
          >
            <i className="fa fa-fw fa-bars my-3" />
          </NavbarToggler>

          <Collapse
            id="topnav-menu-content"
            isOpen={isOpenMenu}
            navbar
            className="my-3"
          >
            <ScrollspyNav
              scrollTargetIds={TargetId}
              scrollDuration="800"
              headerBackground="true"
              activeNavClass="active"
              className="navbar-collapse"
            >
              <Nav className="ms-auto navbar-nav" id="topnav-menu">
                {navItems.map((item, key) => (
                  <NavItem
                    key={key}
                    className={item.navheading === "Home" ? "active" : ""}
                  >
                    <NavLink href={"#" + item.idnm}> {item.navheading}</NavLink>
                  </NavItem>
                ))}
              </Nav>
            </ScrollspyNav>
            <div className="ms-lg-2">
              <Link to="/login" className="btn btn-light w-xs">
                Se connecter
              </Link>
            </div>
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  )
};

Navbar_Page.propTypes = {
  imglight: PropTypes.any,
  navClass: PropTypes.string
};

export default Navbar_Page;
