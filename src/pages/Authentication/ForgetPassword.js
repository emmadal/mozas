import MetaTags from "react-meta-tags";
import React, { useState } from "react";
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

import { Link } from "react-router-dom";

import { getUserEmail, forgetPassword } from "helpers/firebase_helper"


// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

const ForgetPasswordPage = () => {
  const [forgetSuccessMsg, setForgetSuccessMsg] = useState("")
  const [forgetErrorMsg, setForgetErrorMsg] = useState("")
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Veuillez entrer votre Email"),
    }),
    onSubmit: async (values) => {
      setLoading(!loading)
      const res = await getUserEmail(values.email)
      if (res) {
        const req = await forgetPassword(values.email)
        if (req) {
          setForgetSuccessMsg(
            `Un Lien de reinitialisation du mot de passe a été envoyé à ${values?.email}`
          )
          setLoading(false)
        }
      } else {
        setLoading(false)
        setForgetErrorMsg("Email introuvable ou compte inexistant")
      }
    }
  });
  const [loading, setLoading] = useState(false)


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
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Skote.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/login">
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
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Entrez votre Email"
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
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Reinitialisation{" "}
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
};

export default ForgetPasswordPage;
