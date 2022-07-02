import React, { useEffect, useContext, useState } from "react";
import MetaTags from "react-meta-tags";
import { UncontrolledAlert, Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link, Navigate } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import { UserContext } from "App";
import { registerUser } from "helpers/firebase_helper";

const Register = () => {
  const [err, setErr] = useState('')
  const [successMsg, SetSuccessMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, serUser] = useState(false)
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Assurez vous que c'est un email valide").required("Entrez votre Email"),
      name: Yup.string().required("Entrez votre Nom & Prénoms"),
      password: Yup.string()
        .min(8, "Mot de passe doit être au moins de 8 caractères")
        .required("Entrez votre Mot de passe"),
    }),
    onSubmit: async values => {
      try {
        setLoading(!loading)
        const res = await registerUser(values)
        if (res) {
          setLoading(false)
          SetSuccessMsg(
            "Votre compte a ete crée avec succès. Veuillez vous connecter"
          )
        }
      } catch (error) {
        setErr("Veuillez verifier votre connexion internet")
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
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Création de compte</h5>
                        <p>Creer votre compte Mozah.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/login">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {successMsg && (
                        <UncontrolledAlert
                          className="alert-dismissible"
                          color="success"
                        >
                          {successMsg}
                        </UncontrolledAlert>
                      )}
                      {err && (
                        <UncontrolledAlert
                          className="alert-dismissible"
                          color="danger"
                        >
                          {err}
                        </UncontrolledAlert>
                      )}
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Nom & Prénoms</Label>
                        <Input
                          name="name"
                          type="text"
                          placeholder="Nom & Prénoms"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name
                              ? true
                              : false
                          }
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Mot de passe</Label>
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

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Création de compte{" "}
                          {loading ? (
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                          ) : null}
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          En vous inscrivant, vous acceptez les{" "}
                          <Link to="#" className="text-primary">
                            Conditions d&#39;utilisation
                          </Link>{" "}
                          de Mozah
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Vous avez déjà un compte ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Se connecter
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
};

export default Register;
