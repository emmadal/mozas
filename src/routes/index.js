import React, { useContext, useMemo } from "react"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// react-router-dom components
import { Navigate } from "react-router-dom"

// Projects
import ProjectsGrid from "../pages/Projects/projects-grid"
import ProjectsList from "../pages/Projects/projects-list"
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview"
import ProjectsCreate from "../pages/Projects/projects-create"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import TemplatePasswordReset from "../pages/Authentication/TemplatePasswordReset"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import DashboardCrypto from "../pages/Dashboard-crypto/index"

//Investors
import InvestorsList from "../pages/Investors/investors-list"
import InvestorDetail from "../pages/Investors/investor-detail"

// Payment
import Payment from "../pages/Payment/payment"

// Home
import Home from "../pages/Home"

// 404
import Page404 from "../pages/404/page-404"

// App context
import AuthContext from "context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext)
  if (!state.uid) {
    return <Navigate to="/" replace />
  }
  return children
}

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard />, index: true },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },

  //profile
  { path: "/profile", component: <UserProfile /> },

  //payment
  { path: "/payment/:projectId", component: <Payment /> },

  //Projects
  { path: "/projects-grid", component: <ProjectsGrid /> },
  { path: "/projects-list", component: <ProjectsList /> },
  { path: "/projects-overview", component: <ProjectsOverview /> },
  { path: "/projects-overview/:id", component: <ProjectsOverview /> },
  { path: "/projects-create", component: <ProjectsCreate /> },

  //Investors
  { path: "/investors-list", component: <InvestorsList /> },
  { path: "/investor/:uid", component: <InvestorDetail /> },
]

const publicRoutes = [
  { path: "/", component: <Home />, index: true },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/reset_password", component: <TemplatePasswordReset /> },
  { path: "*", component: <Page404 /> },
]

export { authProtectedRoutes, publicRoutes, ProtectedRoute }
