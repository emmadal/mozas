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
  FormFeedback,
} from "reactstrap"
import { useLocation, useNavigate } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import { PayPalButtons } from "@paypal/react-paypal-js"

import MetaTags from "react-meta-tags"
import Breadcrumbs from "components/Common/Breadcrumb"
import { addTransaction, affiliateProject } from "helpers/firebase_helper"
import { UserContext } from "App"

import { useFormik } from "formik"

const Payment = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState(false)
  const [metamask_err, setMetamask_err] = useState(true)
  const [methodType, setMethodType] = useState("")


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      price: 0,
    },
    validate: (values) => {
      const errors = {};
      if (state.offer === "Offre Standard") {
        if (values.price < 100 || values.price > 750) {
          errors.price =
            "L'investissement pour l'Offre Standard est compris entre  100 - 750 €"
        }
      }
      if (state.offer === "Offre Premium") {
        if (values.price < 800 || values.price > 2500) {
          errors.price =
            "L'investissement pour l'Offre Premium est compris entre  800 - 2500 €"
        }
      }
      if (state.offer === "Offre Gold") {
        if (values.price < 2750 || values.price > 10000) {
          errors.price =
            "L'investissement pour l'Offre Gold est compris entre  2750 - 10000 €"
        }
      }
      return errors;
    },
    onSubmit: async values => {},
  })

  // Paypal functions to create, approve and handle error order
  const createOrder = (data, actions, error) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Collecte des fonds pour des projets",
          amount: {
            currency_code: "EUR",
            value: validation.values.price,
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
          project_name: state.project.name,
          creation_time: order.update_time,
          uid: user.uid,
        }
        // attribute transaction to user
        await addTransaction(req)

        if (validation.values.price >= 100 && validation.values.price <= 750) {
          // compute user income
          const profit = parseFloat(
            String((validation.values.price * 20) / 100)
          ).toFixed(2)

          // create an object for user related project
          const project = {
            projectId: state.project.id,
            project_name: state.project.name,
            project_budget: state.project.budget,
            token: 100,
            income: parseFloat(profit),
            amount_invested: validation.values.price,
          }

          // attribute project to investor
          await affiliateProject(user, project)
        }
        if (validation.values.price >= 800 && validation.values.price <= 2500) {
          // compute user income
          const profit = parseFloat(
            String((validation.values.price * 25) / 100)
          ).toFixed(2)

          // create an object for user related project
          const project = {
            projectId: state.project.id,
            project_name: state.project.name,
            project_budget: state.project.budget,
            token: 300,
            income: parseFloat(profit),
            amount_invested: validation.values.price,
          }

          // attribute project to investor
          await affiliateProject(user, project)
        }
        if (
          validation.values.price >= 2750 &&
          validation.values.price <= 10000
        ) {
          // compute user income
          const profit = parseFloat(
            String((validation.values.price * 30) / 100)
          ).toFixed(2)

          // create an object for user related project
          const project = {
            projectId: state.project.id,
            project_name: state.project.name,
            project_budget: state.project.budget,
            token: 500,
            income: parseFloat(profit),
            amount_invested: validation.values.price,
          }

          // attribute project to investor
          await affiliateProject(user, project)
        }
      }
    } else {
      setMetamask_err(false)
    }
  }
  const onError = err => setErr(true)

  const handleChange = e => setMethodType(e.target.value)

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Mozah Invest | Plateforme innovante d&#39;investissement
            participative sur des projets couplée à la finance digitale
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
                    <div>
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
                      <>
                        <div className="mb-4">
                          <Label className="form-label mt-4">
                            Montant pour l&#39;investissement
                          </Label>
                          <Input
                            name="price"
                            className="form-control"
                            placeholder="Montant pour l'investissement"
                            type="number"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.price || ""}
                            invalid={
                              validation.touched.price &&
                              validation.errors.price
                                ? true
                                : false
                            }
                          />
                          {validation.touched.price &&
                          validation.errors.price ? (
                            <FormFeedback type="invalid">
                              {validation.errors.price}
                            </FormFeedback>
                          ) : null}
                        </div>
                        {validation.isValid && (
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                            style={{
                              color: "blue",
                              layout: "horizontal",
                              tagline: false,
                              shape: "pill",
                            }}
                          />
                        )}
                      </>
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
                    Offre Choisie{" "}
                  </h6>
                  <p className=" fw-bold">{state.offer}</p>
                  {validation.isValid && (
                    <>
                      <h6 className="text-muted fw-bold text-decoration-underline mt-3">
                        Montant à investir{" "}
                      </h6>
                      <p className="text-danger fw-bold">
                        {validation.values.price} €
                      </p>
                    </>
                  )}
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
