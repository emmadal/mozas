import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import "./i18n"

ReactDOM.render(
  <PayPalScriptProvider
    options={{
      "client-id": process.env.REACT_APP_PAYPAL,
      currency: "EUR",
    }}
  >
    <App />
  </PayPalScriptProvider>,
  document.getElementById("root")
)
serviceWorker.register()
