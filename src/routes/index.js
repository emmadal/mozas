import React from "react"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// //Projects
import ProjectsGrid from "../pages/Projects/projects-grid"
import ProjectsList from "../pages/Projects/projects-list"
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview"
import ProjectsCreate from "../pages/Projects/projects-create"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import DashboardCrypto from "../pages/Dashboard-crypto/index"

//Investors
import InvestorsList from "../pages/Investors/investors-list"
import InvestorDetail from "../pages/Investors/investor-detail"

// Payment 
import Payment from "../pages/Payment/payment"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard />, index: true },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },

  //profile
  { path: "/profile", component: <UserProfile /> },

  //payment
  { path: "/payment/:projectId/:price", component: <Payment /> },

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
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
]

export { authProtectedRoutes, publicRoutes }
