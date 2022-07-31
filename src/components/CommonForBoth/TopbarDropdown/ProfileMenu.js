import React, { useState, useContext } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap"
import Avatar from "react-avatar"
import { Link } from "react-router-dom"

// App Context
import AuthContext from "context/AuthContext"

const ProfileMenu = () => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const { state, dispatch } = useContext(AuthContext)

  const logOut = () => dispatch.signOut()

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          {!state?.photo.length ? (
            <Avatar name={state?.fullName} size="35" round={true} />
          ) : (
            <img
              src={state?.photo}
              alt="Header Avatar"
              className="rounded-circle header-profile-user"
            />
          )}
          <span className="d-none d-xl-inline-block ms-2 me-1">
            {state?.fullName}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/profile" className="dropdown-item">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            Profil{" "}
          </Link>
          {/* <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            Profil{" "}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            Wallet
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            Paramètres
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1"/>
            {props.t("Lock screen")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Link to="/#" className="dropdown-item" onClick={logOut}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Déconnexion</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default ProfileMenu
