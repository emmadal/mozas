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



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   "pk_test_51INL7fI5fH8xXkt995pWqqMfcaaaMia2YNbjjSxz05YqDA2CfUMjTs5WOqVT6WS5Ri8qi5FyRJx94GILtSMMJ1Jn00AQ2aE6wz"
// )

const App = () => {
  const [user, setUser] = useState(null)

  // passing the client secret obtained from the server
  // const options = {
  //   clientSecret:
  //     "sk_test_51INL7fI5fH8xXkt9JczBWIWEe7L3jG2PFT9xOt8dmamq05kuBLh0XyvjCSlb3Q9B8Kv9rJZEPItgu9LgVl4VdF8z00sXh1DbHS",
  // }

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
