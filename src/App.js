import React, { useState, useEffect, useCallback } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import firebase
import {getAuth, onAuthStateChanged,} from 'firebase/auth'
import { getUserByUID } from "helpers/firebase_helper"

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// create global store context
export const UserContext = React.createContext(null);

const App = () => {
  const [user, setUser] = useState(null)

  // Handle user state changes
  const onAuthState = useCallback(() => {
    onAuthStateChanged(getAuth(), res => {
      if (res) {
        getUserByUID(res.uid).then(e => {
          setUser(e)
        })
      }
    })
  }, [setUser])

  useEffect(() => {
    const subscriber = onAuthState()
    return () => subscriber
  }, [onAuthState])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {publicRoutes.map((route, key) => (
            <Route
              key={key}
              path={route.path}
              element={<NonAuthLayout>{route?.component}</NonAuthLayout>}
            />
          ))}

          {user &&
            authProtectedRoutes.map((route, key) => (
              <Route
                key={key}
                path={route.path}
                index={route?.index}
                element={<VerticalLayout>{route?.component}</VerticalLayout>}
              />
            ))}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}


// export default connect(mapStateToProps, null)(App)
export default App
