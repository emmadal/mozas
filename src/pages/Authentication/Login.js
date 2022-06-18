import MetaTags from "react-meta-tags";
import React, { useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  UncontrolledAlert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

import { Link, useNavigate } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";


// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logo.svg";

import { UserContext } from "App"
import { loginUser, getUserByUID } from "helpers/firebase_helper"

const Login = props => {
  const { setUser } = React.useContext(UserContext)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Entrez votre Email"),
      password: Yup.string().required("Entrez votre Mot de passe"),
    }),
    onSubmit: async (values) => {
      try {
        const { email, password } = values
        setLoading(!loading)
        const res = await loginUser(email, password)
        if (res) {
          setLoading(false)
          getUserByUID(res.uid).then(e => {
            setUser(e)
            navigate("/dashboard", {replace: true})
          })
        }
      } catch (error) {
        setLoading(false)
        setErr("Mot de passe ou email incorrect")
      }
    }
  });

  return (
    <React.Fragment>
      <MetaTags>
        <title>Connexion | Mozas</title>
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
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Bienvenue !</h5>
                        <p>Connectez vous pour continuer.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/login" className="auth-logo-light">
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
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {err && (
                        <UncontrolledAlert
                          color="danger"
                          role="alert"
                          className="alert-dismissible"
                        >
                          {err}
                        </UncontrolledAlert>
                      )}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
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
                        <Label className="form-label">Mot de passe</Label>
                        <Input
                          name="password"
                          className="form-control"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Mot de passe"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
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

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Se connecter{" "}
                          {loading ? (
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                          ) : null}
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Mot de passe oublié?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Vous n&#39;avez pas de compte ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Creer un nouveau compte{" "}
                  </Link>{" "}
                </p>
                <p>© {new Date().getFullYear()} Mozas. </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
};

export default Login;
