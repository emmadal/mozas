import MetaTags from "react-meta-tags";
import React, { useState, useContext, useRef } from "react";
import Dropzone from "react-dropzone"
import Avatar from "react-avatar"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  UncontrolledAlert,
  Form,
  CardTitle,
  CardSubtitle,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { UserContext } from "App";

//Api call
import {
  updateUserProfile,
  uploadProfilePicture,
} from "helpers/firebase_helper"

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext)
  const [actionType, setActionType] = useState("")
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [error, setError] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [update, setUpdate] = useState(false)
  const ref = useRef()
  const [selectedFiles, setselectedFiles] = useState([])

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: user?.email,
      fullName: user?.fullName || "",
      wallet: user?.metamask_acc || "",
      phoneNumber: user?.phoneNumber || "",
      old_password: "",
      newpassword1: "",
      newpassword2: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Entrez votre Nom & Prénoms"),
      phoneNumber: Yup.string().required("Entrez votre Telephone mobile"),
      wallet: Yup.string().required("Entrez votre adresse Metamask"),
    }),
    onSubmit: async values => {
      if (actionType === "update_profile") {
        setLoading1(!loading1)
        const { fullName, wallet, phoneNumber } = values
        const res = await updateUserProfile(user, {
          fullName,
          wallet,
          phoneNumber,
        })
        if (res) {
          setLoading1(false)
          setUpdate(!update)
          setUser(res)
        }
      }

      if (actionType === "update_password") {
      }
      // console.log(values)
    },
  })

  const uploadPicture = () => {
    document.getElementById("input_file").click()
    document
      .getElementById("input_file")
      .addEventListener("change", async () => {
        setLoading2(!loading2)
        const pic = await uploadProfilePicture(ref.current.files[0], "profile")
        console.log(pic[0].link)
        setImageURL(pic[0].link)
        if (pic.length) {
          const res = await updateUserProfile(user, {
            photo: pic[0].link,
            fullName: user?.fullName,
            wallet: user?.metamask_acc,
            phoneNumber: user?.phoneNumber,
          })
          if (res) {
            setLoading2(false)
            setUpdate(!update)
            setUser(res)
          }
        }
      })
  }

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
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="ms-3 me-2">
                      {!user?.photo.length ? (
                        <Avatar name={user?.fullName} size="70" round={true} />
                      ) : (
                        <img
                          src={user?.photo ?? imageURL}
                          alt="profile picture"
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      )}
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{user?.fullName}</h5>
                        <p className="mb-1">{user?.email}</p>
                        <p className="mb-1">{user?.phoneNumber}</p>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      color="primary"
                      className="float-end"
                      onClick={e => {
                        e.preventDefault()
                        uploadPicture()
                      }}
                    >
                      Telecharger une photo de profil{" "}
                      {loading2 ? (
                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                      ) : null}
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      id="input_file"
                      ref={ref}
                      hidden
                    />
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
                      <Label className="form-label">Nom & Prénoms</Label>
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
                        Telephone mobile(suivi du code indicatif)
                      </Label>
                      <Input
                        name="phoneNumber"
                        placeholder="Ex: +2250707070707"
                        className="form-control"
                        type="tel"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phoneNumber || ""}
                        invalid={
                          validation.touched.phoneNumber &&
                          validation.errors.phoneNumber
                            ? true
                            : false
                        }
                      />
                      {validation.touched.phoneNumber &&
                      validation.errors.phoneNumber ? (
                        <FormFeedback type="invalid">
                          {validation.errors.phoneNumber}
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
                        Mettre a jour le profile{" "}
                        {loading1 ? (
                          <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                        ) : null}
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

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle>Document Bancaire</CardTitle>
                  <CardSubtitle className="mb-3">
                    {" "}
                    Telecharger vos documents bancaire ici (RIB).
                  </CardSubtitle>
                  <Form>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Telecharger vos documents.</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <button type="button" className="btn btn-primary ">
                      Telecharger
                    </button>
                  </div>
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
