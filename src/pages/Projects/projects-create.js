import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  FormFeedback,
  UncontrolledAlert
} from "reactstrap"

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { addProject } from "helpers/firebase_helper"
import { values } from "lodash";


const ProjectsCreate = () => {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState(false);
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
      projectname: "",
      projectdesc: "",
      projectbudget: "",
      projectfiles: selectedFiles,
    },
    validationSchema: Yup.object({
      projectname: Yup.string().required("Entrez le nom de votre projet"),
      projectdesc: Yup.string().required(
        "Entrez la description de votre projet"
      ),
      projectbudget: Yup.string()
        .matches(/^[0-9]*$/, "Votre budget ne doit etre que des chiffres")
        .required("Entre le budget de votre projet"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(!loading)
      const res = await addProject(values, selectedFiles)
      if (res) {
        resetForm({ values: "" })
        setLoading(false)
        setSuccess(true)
      }
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Création de projets | Mozah - Admin</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projets" breadcrumbItem="Nouveau projet" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  {success ? (
                    <UncontrolledAlert
                      color="success"
                      className="alert-dismissible fade show"
                      role="alert"
                      onClick={() => setSuccess(false)}
                    >
                      <i className="mdi mdi-check-all me-2"></i>Votre projet a été crée avec succès.
                    </UncontrolledAlert>
                  ) : null}
                  <CardTitle className="mb-4">
                    Créer un nouveau projet
                  </CardTitle>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectname"
                        className="col-form-label col-lg-3"
                      >
                        Nom du projet
                      </Label>
                      <Col lg="9">
                        <Input
                          id="projectname"
                          name="projectname"
                          value={validation.values.projectname || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.projectname &&
                            validation.errors.projectname
                              ? true
                              : false
                          }
                          type="text"
                          className="form-control"
                          placeholder="Nom du projet"
                        />
                        {validation.touched.projectname &&
                        validation.errors.projectname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.projectname}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-3"
                      >
                        Description du projet
                      </Label>
                      <Col lg="9">
                        <Input
                          type="textarea"
                          className="form-control"
                          id="projectdesc"
                          name="projectdesc"
                          value={validation.values.projectdesc || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.projectdesc &&
                            validation.errors.projectdesc
                              ? true
                              : false
                          }
                          rows="3"
                          placeholder="Description du projet"
                        />
                        {validation.touched.projectdesc &&
                        validation.errors.projectdesc ? (
                          <FormFeedback type="invalid">
                            {validation.errors.projectdesc}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="projectbudget"
                        className="col-form-label col-lg-3"
                      >
                        Budget (EUR)
                      </label>
                      <Col lg="9">
                        <Input
                          id="projectbudget"
                          name="projectbudget"
                          value={validation.values.projectbudget || ""}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.projectbudget &&
                            validation.errors.projectbudget
                              ? true
                              : false
                          }
                          type="text"
                          placeholder="Budget du projet"
                          className="form-control"
                        />
                        {validation.touched.projectbudget &&
                        validation.errors.projectbudget ? (
                          <FormFeedback type="invalid">
                            {validation.errors.projectbudget}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Row className="mb-4">
                        <Label className="col-form-label col-lg-3">
                          Pièces jointes
                        </Label>
                        <Col lg="9">
                          <Dropzone
                            multiple={true}
                            onDrop={acceptedFiles => {
                              handleAcceptedFiles(acceptedFiles)
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="dz-message needsclick">
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>Ajouter les images du projets ici.</h4>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
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
                        </Col>
                      </Row>
                    </FormGroup>

                    <Row className="justify-content-end">
                      <Col lg="9">
                        <Button type="submit" color="primary">
                          Nouveau projet{" "}
                          {loading ? (
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                          ) : null}
                        </Button>
                      </Col>
                    </Row>
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

export default ProjectsCreate;
