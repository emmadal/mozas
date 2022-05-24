import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = (props) => {

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    // if (leftSideBarType === "default") {
    //   dispatch(changeSidebarType("condensed", isMobile));
    // } else if (leftSideBarType === "condensed") {
    //   dispatch(changeSidebarType("default", isMobile));
    // }
  };

  //hides right sidebar on body click
  const hideRightbar = (event) => {
    // var rightbar = document.getElementById("right-bar");
    // //if clicked in inside right bar, then do nothing
    // if (rightbar && rightbar.contains(event.target)) {
    //   return;
    // } else {
    //   //if clicked in outside of rightbar then fire action for hide rightbar
    //    dispatch(showRightSidebarAction(false));
    // }
  };

  /*
  layout  settings
  */

  useEffect(() => {
    //init body click event fot toggle rightbar
    document.body.addEventListener("click", hideRightbar, true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header toggleMenuCallback={toggleMenuCallback} />
        <Sidebar
          theme="darken"
          type="condensed"
          isMobile={isMobile}
        />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  )
};

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarThemeImage: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
};

export default withRouter(Layout);
