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
  Label,
} from "reactstrap"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import { PayPalButtons } from "@paypal/react-paypal-js"

import MetaTags from "react-meta-tags"
import Breadcrumbs from "components/Common/Breadcrumb"
import { addTransaction, affiliateProject } from "helpers/firebase_helper"
import { UserContext } from "App"

const Payment = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const project_name = state.project.name
  const project_budget = state.project.budget
  const projectId = state.project.id
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState(false)
  const [metamask_err, setMetamask_err] = useState(true)
  const params = useParams()
  const price = Number(params.price)
  const [methodType, setMethodType] = useState("")

  // Paypal functions to create, approve and handle error order
  const createOrder = (data, actions, error) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Collecte des fonds pour des projets",
          amount: {
            currency_code: "EUR",
            value: price,
          },
        },
      ],
    })
  }

  const onApprove = async (data, actions) => {
    if (user.metamask_acc.length > 0) {
      const order = await actions.order.capture()
      if (order.status === "COMPLETED") {
        setSuccess(true)
        const req = {
          id: order.id,
          amount: order.purchase_units[0].amount.value,
          fullName: user?.fullName,
          payment_status: "Payé",
          currency: order.purchase_units[0].amount.currency_code,
          payment_method: "Paypal",
          project_name,
          creation_time: order.update_time,
          uid: user.uid,
        }
        // attribute transaction to user
        await addTransaction(req)

        if (price >= 1000 && price < 2500) {
          // compute user income
          const profit = parseFloat(String((price * 20) / 100)).toFixed(2)

          // create an object for user related project
          const project = {
            projectId,
            project_name,
            project_budget,
            token: 20,
            income: parseFloat(profit),
            amount_invested: price,
          }

          // attribute project to investor
          await affiliateProject(user, project)
        }
        if (price >= 2500 && price < 5000) {
          // compute user income
          const profit = parseFloat(String((price * 25) / 100)).toFixed(2)

          // create an object for user related project
          const project = {
            projectId,
            project_name,
            project_budget,
            token: 50,
            income: parseFloat(profit),
            amount_invested: price,
          }

          // attribute project to investor
          await affiliateProject(user, project)
        }
        if (price >= 5000) {
          // compute user income
          const profit = parseFloat(String((price * 30) / 100)).toFixed(2)

          // create an object for user related project
          const project = {
            projectId,
            project_name,
            project_budget,
            token: 100,
            income: parseFloat(profit),
            amount_invested: price,
          }

          // attribute project to investor
          await affiliateProject(user, project)
        }
      }
    } else {
      setMetamask_err(false)
    }
  }
  const onError = err => {
    console.log(err)
    setErr(true)
  }
  const handleChange = e => setMethodType(e.target.value)

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
        <title>
          Mozah Invest | Plateforme innovante d&#39;investissement participative
          sur des projets couplée à la finance digitale
        </title>
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
                  <Form id="payment-form">
                    <div className="mb-5">
                      <div className="form-check mb-3">
                        <Input
                          type="radio"
                          id="customRadioInline1"
                          name="mobile"
                          checked={methodType === "mobile"}
                          value="mobile"
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="customRadioInline1"
                        >
                          Paiement mobile
                        </Label>
                      </div>
                      <div className="form-check mb-3">
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
                    {methodType === "mobile" ? (
                      <div>
                        <button
                          className="btn btn-warning mx-1"
                          onClick={() => ""}
                        >
                          Orange Money
                        </button>
                        <button
                          className="btn btn-primary mx-1"
                          onClick={() => ""}
                        >
                          Wave Mobile
                        </button>
                      </div>
                    ) : methodType === "paypal" ? (
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        style={{
                          color: "blue",
                          layout: "vertical",
                          tagline: false,
                          shape: "pill",
                        }}
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
          {err ? (
            <SweetAlert
              title="Echec de paiement."
              error
              confirmBtnBsStyle="error"
              onConfirm={() => setErr(false)}
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
