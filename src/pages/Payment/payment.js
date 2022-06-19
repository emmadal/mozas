import React, { useContext, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Form,
  Input,
  Label
} from "reactstrap"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import { PayPalButtons } from "@paypal/react-paypal-js"

import MetaTags from "react-meta-tags"
import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"
import Breadcrumbs from "components/Common/Breadcrumb"
import { addTransaction, sendToken } from "helpers/firebase_helper"
import { UserContext } from "App"

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      borderColor: 'red',
      borderWidth: 3,
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
}

const Payment = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  const project_name = state.project.name
  const project_budget = state.project.budget
  const projectId = state.project.id
  const elements = useElements()
  const [success, setSuccess] = useState(false)
  const [metamask_err, setMetamask_err] = useState(true)
  const stripe = useStripe()
  const { price } = useParams()
  const [methodType, setMethodType] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return ""
    }
    const result = stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    })

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  // Paypal functions to create, approve and handle error order
  const createOrder = (data, actions, error) => {
      return actions.order.create({
        purchase_units: [
          {
            description: "Investment in project",
            amount: {
              currency_code: "EUR",
              value: parseFloat(String(price)).toFixed(2),
            },
          },
        ],
      })
  }
  const onApprove = async (data, actions) => {
     if (user.metamask_acc.length > 0) {
       const order = await actions.order.capture()
       if (order.status === "COMPLETED") {
         setSuccess(!success)
         const req = {
           id: order.id,
           amount: order.purchase_units[0].amount.value,
           currency: order.purchase_units[0].amount.currency_code,
           payment_method: "Paypal",
           project_name,
           creation_time: order.update_time,
           uid: user.uid,
         }
         await addTransaction(req)
         if (price >= 1000 && price < 2500) {
           const profit = parseFloat(String((price * 1.5) / 100)).toFixed(2)
           const income = { id: String(new Date().getTime()), profit }
           const project = {
             projectId,
             project_name,
             project_budget,
             token: 20,
             amount_invested: price,
           }
           const token = { id: String(new Date().getTime()), token: 20 }
           await sendToken(user?.uid, token, project, income)
         }
         if (price >= 2500 && price < 5000) {
           const profit = parseFloat(String((price * 1.5) / 100)).toFixed(2)
           const income = { id: String(new Date().getTime()), profit }
           const project = {
             projectId,
             project_name,
             project_budget,
             token: 40,
             amount_invested: price,
           }
           const token = { id: String(new Date().getTime()), token: 40 }
           await sendToken(user?.uid, token, project, income)
         }
         if (price >= 5000) {
           const profit = parseFloat(String((price * 1.5) / 100)).toFixed(2)
           const income = { id: String(new Date().getTime()), profit }
           const token = { id: String(new Date().getTime()), token: 100 }
           const project = {
             projectId,
             project_name,
             project_budget,
             token: 100,
             amount_invested: price,
           }
           await sendToken(user?.uid, token, project, income)
         }
       }
     } else {
      setMetamask_err(false)
     }
  }
  const onError = (err) => console.log(err)
  const handleChange = e => setMethodType(e.target.value)

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Paiement | Mozah - Admin</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Paiement" breadcrumbItem="paiement" />

          <Row>
            <Col sm={6}>
              <Card>
                <CardBody>
                  <CardTitle className="fw-bold mb-5">
                    Méthode de paiement
                  </CardTitle>
                  <Form id="payment-form" onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <div className="form-check">
                        <Input
                          type="radio"
                          id="customRadioInline1"
                          name="card"
                          value="card"
                          checked={methodType === "card"}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="customRadioInline1"
                        >
                          Carte de crédit(Visa/Mastercard)
                        </Label>
                      </div>
                      &nbsp;
                      <div className="form-check mb-5">
                        <Input
                          type="radio"
                          id="customRadioInline2"
                          name="paypal"
                          checked={methodType === "paypal"}
                          value="paypal"
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="customRadioInline2"
                        >
                          Paypal
                        </Label>
                      </div>
                    </div>
                    {methodType === "card" ? (
                      <>
                        <CardElement
                          id="card-element"
                          options={CARD_ELEMENT_OPTIONS}
                        />
                        <div className="text-center">
                          <button
                            className="btn btn-primary  mt-5"
                            type="submit"
                          >
                            Procéder au paiement
                          </button>
                        </div>
                      </>
                    ) : methodType === "paypal" ? (
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        style={{ layout: "vertical" }}
                      />
                    ) : null}
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col sm={6}>
              <Card className="">
                <CardBody>
                  <CardTitle>Resumé du projet</CardTitle>
                  <h6 className="text-muted fw-bold text-decoration-underline mt-3">
                    Nom du projet{" "}
                  </h6>
                  <p className="fw-bold">{state.project.name}</p>
                  <h6 className="text-muted fw-bold text-decoration-underline mt-3">
                    Description du projet{" "}
                  </h6>
                  <p className="fw-bold word-break">{state.project.desc}</p>
                  <h6 className="text-muted fw-bold text-decoration-underline mt-3">
                    Budget du projet{" "}
                  </h6>
                  <p className="text-danger fw-bold">
                    {state.project.budget} €
                  </p>
                  <h6 className="text-muted fw-bold text-decoration-underline mt-3">
                    Status du projet{" "}
                  </h6>
                  <p className=" fw-bold">{state.project.status}</p>
                  <h6 className="text-muted fw-bold text-decoration-underline mt-3">
                    Montant à investir{" "}
                  </h6>
                  <p className="text-danger fw-bold">{price} €</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {success ? (
            <SweetAlert
              title="Paiement effectuée avec succès"
              success
              confirmBtnBsStyle="success"
              onConfirm={() => setSuccess(false)}
            ></SweetAlert>
          ) : null}
          {!metamask_err ? (
            <SweetAlert
              title="Mettez à jour votre addresse Metamask avant de continuer"
              error
              confirmBtnBsStyle="error"
              onConfirm={() => navigate("/profile")}
            ></SweetAlert>
          ) : null}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Payment
