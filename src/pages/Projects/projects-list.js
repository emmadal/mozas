import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, withRouter } from "react-router-dom";
import { map } from "lodash";
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Component
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";

import {
  updateProjectSuccess as onupdateProjectSuccess,
  deleteProject as onDeleteProject,
  getProjectsSuccess as onGetProjectsSuccess
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux";

const ProjectsList = () => {
  const dispatch = useDispatch()
  const [project, setProject] = useState(null)
  const { projects } = useSelector(state => ({
    projects: state.projects.projects,
  }))
  const [fileURL, setFileURL] = useState("")
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: (project && project.id) || "",
      name: (project && project.name) || "",
      budget: (project && project.budget) || "",
      description: (project && project.description) || "",
      status: (project && project.status) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Entrez le nom du projet"),
      description: Yup.string().required("Entrez la description du projet"),
      status: Yup.string().required("Veuillez choisir le status du projet"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const newUpdateProject = {
          id: project?.id,
          name: values.name ?? project?.name,
          budget: values.budget ?? project?.budget,
          desc: values.description ?? project?.desc,
          status: values.status ?? project?.status,
        }

        // update project
        dispatch(onupdateProjectSuccess(newUpdateProject))
      }
      toggle()
    },
  })

  const toggle = () => {
    if (modal) {
      setModal(false)
      setProject(null)
    } else {
      setModal(true)
    }
  }

  const handleProjectClick = arg => {
    setIsEdit(!isEdit)
    setProject({
      id: arg.id,
      name: arg.name,
      budget: arg.budget,
      description: arg.desc,
      status: arg.status,
    })
    setFileURL(arg.files[0])
    toggle()
  }

  const handleDeleteProject = arg => {
    dispatch(onDeleteProject(arg))
  }

  //delete order
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = arg => {
    setProject(arg)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    dispatch(onDeleteProject(project))
    setDeleteModal(false)
  }

  useEffect(() => {
    dispatch(onGetProjectsSuccess())
  }, [dispatch])

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Liste des projets | Mozas - Admin</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projets" breadcrumbItem="Liste des projets" />

          <Row>
            <Col>
              <Table className="project-list-table table-nowrap align-middle table-borderless">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "100px" }}>
                      ID
                    </th>
                    <th scope="col">Projets</th>
                    <th scope="col">Status</th>
                    <th scope="col">Budget(FCFA)</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {map(projects, (project, index) => (
                    <tr key={project.id}>
                      <td>{index + 1}</td>
                      <td>
                        <h5 className="text-truncate font-size-14">
                          <Link
                            to={`/projects-overview/${project.id}`}
                            className="text-dark"
                          >
                            {project.name}
                          </Link>
                        </h5>
                      </td>
                      <td>
                        <Badge
                          color={
                            project.status === "En attente"
                              ? "primary"
                              : project.status === "Terminé"
                              ? "success"
                              : project.status === "En cours"
                              ? "info"
                              : ""
                          }
                        >
                          {project.status}
                        </Badge>
                      </td>
                      <td>
                        <h5 className="text-truncate font-size-14">
                          {project.budget}
                        </h5>
                      </td>

                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            href="#"
                            className="card-drop"
                            tag="i"
                          >
                            <i className="mdi mdi-dots-horizontal font-size-18" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem
                              href="#"
                              onClick={() => handleProjectClick(project)}
                            >
                              <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                              Modifier
                            </DropdownItem>
                            <DropdownItem
                              href="#"
                              onClick={() => onClickDelete(project)}
                            >
                              <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                              Supprimer
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} tag="h4">
                  Modifier le projet
                </ModalHeader>
                <ModalBody>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <Row form>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label className="form-label">Nom du projet</Label>
                          <Input
                            name="name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.name}
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
                          <Label className="form-label">Description</Label>
                          <Input
                            name="description"
                            type="textarea"
                            rows="3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.description}
                            invalid={
                              validation.touched.description &&
                              validation.errors.description
                                ? true
                                : false
                            }
                          />
                          {validation.touched.description &&
                          validation.errors.description ? (
                            <FormFeedback type="invalid">
                              {validation.errors.description}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">
                            Budget du projet (FCFA)
                          </Label>
                          <Input
                            name="budget"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.budget}
                            invalid={
                              validation.touched.budget &&
                              validation.errors.budget
                                ? true
                                : false
                            }
                          />
                          {validation.touched.budget &&
                          validation.errors.budget ? (
                            <FormFeedback type="invalid">
                              {validation.errors.budget}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">
                            Status({project?.status})
                          </Label>
                          <Input
                            name="status"
                            id="status1"
                            type="select"
                            className="form-select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.status}
                          >
                            <option></option>
                            <option>En attente</option>
                            <option>En cours</option>
                            <option>Terminé</option>
                          </Input>
                          {validation.touched.status &&
                          validation.errors.status ? (
                            <FormFeedback type="invalid">
                              {validation.errors.status}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-success save-user"
                          >
                            Mise à jour
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>

          {projects && projects.length ? null : (
            <Row>
              <Col xs="12">
                <div className="text-center my-3">
                  <Link to="#" className="text-success">
                    <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                    Chargement
                  </Link>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
};

export default withRouter(ProjectsList);
