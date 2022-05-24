import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"

const Logout = props => {

  useEffect(() => {
    // dispatch(logoutUser(props.history))
  }, [dispatch])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
