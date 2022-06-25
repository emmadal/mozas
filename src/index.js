import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import "./i18n";

;(async () => {
  ReactDOM.render(
    <PayPalScriptProvider
      options={{
        "client-id":
          "ASXCGrhNZwvGmgjjDJlFXjouR1CEs3LDcvWsmaQIblIC-2pJVQaL2DFZx8HP5v_wmbPxY-AP2zpAneKz",
        currency: "EUR",
      }}
    >
      <App />
    </PayPalScriptProvider>,
    document.getElementById("root")
  )
  serviceWorker.unregister()
})()