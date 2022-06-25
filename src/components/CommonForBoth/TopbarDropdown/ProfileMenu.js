import React, { useState, useEffect, useContext } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap"
import Avatar from "react-avatar"
import { Link, useNavigate } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"
import { UserContext } from "App"
import { logout } from "helpers/firebase_helper"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [username, setusername] = useState("Admin")

  const logOut = () => {
    logout().then(() => {
      setUser(null)
      navigate("/login", { replace: true })
    })
  }
    

  useEffect(() => {
    setusername(user?.fullName)
  }, [props.success])

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
          {!user?.photo.length ? (
            <Avatar name={user?.fullName} size="35" round={true} />
          ) : (
            <img
              src={user?.photo}
              alt="Header Avatar"
              className="rounded-circle header-profile-user"
            />
          )}
          <span className="d-none d-xl-inline-block ms-2 me-1">
            {user?.fullName}
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
