import React, { useState } from "react";
import { Link } from "react-router-dom";

// Reactstrap
// import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
// import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
// import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png"
import logoLightSvg from "../../assets/images/logo-light.svg";

const Header = props => {
  const [search, setsearch] = useState(false);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  {/* <img src={logo} alt="" height="22" /> */}
                  <img src={logoLightPng} alt="" height="50" />
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  {/* <img src={logoLightSvg} alt="" height="22" /> */}
                  <img src={logoLightPng} alt="" height="50" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search)
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Recherche ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* <LanguageDropdown /> */}
            {/* <NotificationDropdown /> */}
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  )
};

export default Header
