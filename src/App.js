import React, { useEffect, useCallback, useReducer, useMemo } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

// Import firebase
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getUserByUID } from "helpers/firebase_helper"

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// 404 Format
import Page404 from "pages/404/page-404"

// create global store context
import AuthContext from "context/AuthContext"

// API call
import { logout } from "helpers/firebase_helper"

const App = () => {
  const navigate = useNavigate()

  // Set the initial state
  const initialState = {
    phoneNumber: "",
    lastLoginTime: null,
    uid: "",
    email: "",
    fullName: "",
    photo: "",
    createdDtm: null,
    metamask_acc: "",
    type: "",
  }

  // use useReducer hooks
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "FETCH_DETAILS":
          return { ...prevState, ...action.payload }
        case "SIGN_OUT":
          return { ...prevState, ...initialState }
        default:
          return { ...prevState }
      }
    },
    initialState
  )

  const authContext = useMemo(
    () => ({
      state,
      dispatch: {
        getDetails: data => {
          dispatch({
            type: "FETCH_DETAILS",
            payload: data,
          })
        },
        signOut: () => {
          logout().then(() => {
            dispatch({ type: "SIGN_OUT" })
            navigate("/", { replace: true })
          })
        },
      },
    }),
    [state]
  )

  // Handle user state changes
  const onAuthState = useCallback(() => {
    onAuthStateChanged(getAuth(), res => {
      if (res) {
        getUserByUID(res.uid).then(user => {
          authContext.dispatch.getDetails(user)
        })
      }
    })
  }, [])

  useEffect(() => {
    const subscriber = onAuthState()
    return () => subscriber
  }, [onAuthState])

  return (
    <AuthContext.Provider value={authContext}>
      <Routes>
        {publicRoutes.map((route, key) => (
          <Route
            key={key}
            path={route.path}
            index={true}
            element={<NonAuthLayout>{route?.component}</NonAuthLayout>}
          />
        ))}

        {authProtectedRoutes.map((route, key) => (
          <Route
            key={key}
            path={route.path}
            index={true}
            element={<VerticalLayout>{route?.component}</VerticalLayout>}
          />
        ))}
        <Route
          path="*"
          element={
            <VerticalLayout>
              <Page404 />
            </VerticalLayout>
          }
        />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
