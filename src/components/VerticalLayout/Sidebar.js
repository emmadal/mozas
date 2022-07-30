import React from "react";
import { Link } from "react-router-dom";
import SidebarContent from "./SidebarContent";
import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";

const Sidebar = () => {

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              {/* <img src={logo} alt="" height="22" /> */}
            </span>
            <span className="logo-lg">
              {/* <img src={logoDark} alt="" height="17" /> */}
              <img src={logoLightPng} alt="" height="50" />
            </span>
          </Link>

          <Link to="/dashboard" className="logo logo-light">
            <span className="logo-sm">
              {/* <img src={logoLightSvg} alt="" height="22" /> */}
              <img src={logoLightPng} alt="" height="22" />
            </span>
            <span className="logo-lg">
              {/* <img src={logoLightPng} alt="" height="19" /> */}
              <img src={logoLightPng} alt="" height="19" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          <SidebarContent />
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
};

export default Sidebar
