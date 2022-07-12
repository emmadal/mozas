import MetaTags from "react-meta-tags"
import React, { useState } from "react"
import {
  Row,
  Col,
  UncontrolledAlert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap"

import { Link } from "react-router-dom"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"

import { ChangeUserPassword } from "helpers/firebase_helper"


const ForgetPasswordPage = () => {
  const [forgetSuccessMsg, setForgetSuccessMsg] = useState("")
  const [forgetErrorMsg, setForgetErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Mot de passe doit être au moins de 8 caractères")
        .required("Entrez votre Mot de passe"),
    }),
    onSubmit: async values => {
      try {
        if (values.password === values.confirm_password) {
          let code = new URL(document.location).searchParams
          setLoading(!loading)
          const res = await ChangeUserPassword(
            code.get("oobCode"),
            values.password
          )
          if (res) {
            setForgetSuccessMsg("Votre mot de passe a été changé")
            setLoading(false)
          }
        } else {
          setLoading(false)
          setForgetErrorMsg("Les deux mots de pass ne correspondent pas.")
        }
      } catch (error) {
        setForgetErrorMsg(error)
      }
    },
  })
  
  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Mozah Invest | Plateforme innovante d&#39;investissement participative
          sur des projets couplée à la finance digitale
        </title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/login" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-white">Changement de mot de passe</h5>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="#">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {forgetErrorMsg ? (
                      <UncontrolledAlert
                        className="alert-dismissible"
                        color="danger"
                      >
                        {forgetErrorMsg}
                      </UncontrolledAlert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <UncontrolledAlert
                        className="alert-dismissible"
                        color="success"
                      >
                        {forgetSuccessMsg}
                      </UncontrolledAlert>
                    ) : null}
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">
                          Nouveau Mot de passe
                        </Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Mot de passe"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">
                          Confirmer votre nouveau Mot de passe
                        </Label>
                        <Input
                          name="confirm_password"
                          type="password"
                          placeholder="Confirmation du mot de passe"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirm_password || ""}
                          invalid={
                            validation.touched.confirm_password &&
                            validation.errors.confirm_password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.confirm_password &&
                        validation.errors.confirm_password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.confirm_password}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Changer le mot de passe{" "}
                            {loading ? (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            ) : null}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Revenir à{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Connexion
                  </Link>{" "}
                </p>
                <p>© {new Date().getFullYear()} Mozah.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ForgetPasswordPage
