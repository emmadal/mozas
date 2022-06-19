import MetaTags from "react-meta-tags";
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  UncontrolledAlert,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
import { UserContext } from "App";

//Api call
import { updateUserProfile } from "helpers/firebase_helper";

const UserProfile = () => {
  const {user, setUser} = useContext(UserContext)
  const [actionType, setActionType] = useState('')
  const [update, setUpdate] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: user?.email,
      fullName: user?.fullName || "",
      wallet: user?.metamask_acc || "",
      old_password: "",
      newpassword1: "",
      newpassword2: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Entrez votre Nom & Prénoms"),
      wallet: Yup.string().required("Entrez votre adresse Metamask"),
    }),
    onSubmit: async (values) => {
      if(actionType === "update_profile"){
        const {fullName, wallet} = values
        const res = await updateUserProfile(user, { fullName, wallet })
        if(res){
          console.log('res: ', res)
          setUpdate(!update);
          setUser(res)
        }
      }

      if (actionType === "update_password") {
      }
      // console.log(values)
    },
  })


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Tableau de bord | Mozah</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Mozah" breadcrumbItem="Profile" />

          <Row>
            <Col sm="8">
              {/* {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null} */}
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{user?.fullName}</h5>
                        <p className="mb-1">{user?.email}</p>
                        <p className="mb-1">{user?.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm="6">
              <h4 className="card-title mb-4">Modifier le profile</h4>
              <Card>
                <CardBody>
                  {update ? (
                    <UncontrolledAlert
                      color="success"
                      className="alert-dismissible fade show"
                      role="alert"
                      onClick={() => setUpdate(false)}
                    >
                      <i className="mdi mdi-check-all me-2"></i>Votre profile a
                      été mis à jour.
                    </UncontrolledAlert>
                  ) : null}

                  <Form
                    className="form-horizontal"
                    onSubmit={e => {
                      e.preventDefault()
                      setActionType("update_profile")
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <div className="form-group">
                      <Label className="form-label">Email</Label>
                      <Input
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email}
                        disabled
                      />

                      <Label className="form-label mt-4">Nom & Prénoms</Label>
                      <Input
                        name="fullName"
                        // value={name}
                        className="form-control"
                        placeholder="Nom & Prénoms"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.fullName || ""}
                        invalid={
                          validation.touched.fullName &&
                          validation.errors.fullName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.fullName &&
                      validation.errors.fullName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.fullName}
                        </FormFeedback>
                      ) : null}

                      <Label className="form-label mt-4">
                        Adresse Metamask
                      </Label>
                      <Input
                        name="wallet"
                        // value={name}
                        className="form-control"
                        placeholder="Adresse Metamask"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.wallet || ""}
                        invalid={
                          validation.touched.wallet && validation.errors.wallet
                            ? true
                            : false
                        }
                      />
                      {validation.touched.wallet && validation.errors.wallet ? (
                        <FormFeedback type="invalid">
                          {validation.errors.wallet}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="text-center mt-4">
                      <Button type="submit" color="danger">
                        Mettre a jour le profile
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col sm="6">
              <h4 className="card-title mb-4">Modifier le mot de passe</h4>
              <Card>
                <CardBody>
                  <Form
                    className="form-horizontal"
                    onSubmit={e => {
                      e.preventDefault()
                      setActionType("update_password")
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <div className="form-group">
                      <Label className="form-label">Mot de passe actuel</Label>
                      <Input
                        name="old_password"
                        className="form-control"
                        placeholder="Mot de passe actuel"
                        type="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.old_password}
                        invalid={
                          validation.touched.old_password &&
                          validation.errors.old_password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.old_password &&
                      validation.errors.old_password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.old_password}
                        </FormFeedback>
                      ) : null}

                      <Label className="form-label mt-4">
                        Nouveau mot de passe
                      </Label>
                      <Input
                        name="newpassword1"
                        className="form-control"
                        placeholder="Nouveau mot de passe"
                        type="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.newpassword1 || ""}
                        invalid={
                          validation.touched.newpassword1 &&
                          validation.errors.newpassword1
                            ? true
                            : false
                        }
                      />
                      {validation.touched.newpassword1 &&
                      validation.errors.newpassword1 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.newpassword1}
                        </FormFeedback>
                      ) : null}

                      <Label className="form-label mt-4">
                        Confirmer le mot de passe
                      </Label>
                      <Input
                        name="newpassword1"
                        className="form-control"
                        placeholder="Confirmer le mot de passe"
                        type="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.newpassword2 || ""}
                        invalid={
                          validation.touched.newpassword2 &&
                          validation.errors.newpassword2
                            ? true
                            : false
                        }
                      />
                      {validation.touched.newpassword2 &&
                      validation.errors.newpassword2 ? (
                        <FormFeedback type="invalid">
                          {validation.errors.newpassword2}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="text-center mt-4">
                      <Button type="submit" color="danger">
                        Mettre a jour le mot de passe
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
};

export default UserProfile;
