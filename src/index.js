import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import "./i18n";

(async () => {
  const publishableKey =
    "pk_test_51INL7fI5fH8xXkt995pWqqMfcaaaMia2YNbjjSxz05YqDA2CfUMjTs5WOqVT6WS5Ri8qi5FyRJx94GILtSMMJ1Jn00AQ2aE6wz"

  const stripePromise = await loadStripe(publishableKey)

  ReactDOM.render(
    <Elements stripe={stripePromise}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AcnTl9c0Wa9WPcgoyYVruH9FmN0_rb8_6v7vnFz6AyVz2SkB3ejq9wB_raN3hoV33TsyUpd392OH2UVc",
          currency: "EUR",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </Elements>,
    document.getElementById("root")
  )
  serviceWorker.unregister()
})()
