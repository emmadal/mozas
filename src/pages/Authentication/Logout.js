import React, { useEffect, useContext } from "react"
import { UserContext } from "App"
import { logout } from "helpers/firebase_helper"
import { useNavigate } from "react-router-dom"


const Logout = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    logout().then(() => {
      setUser(null)
      navigate("/", { replace: true })
    })
  }, [])

  return <></>
}

export default Logout
