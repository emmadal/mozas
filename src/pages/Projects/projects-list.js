import React, { useEffect, useState, useContext } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
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
  UncontrolledAlert,
  Label,
} from "reactstrap"
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from "App"

//Import Component
import Breadcrumbs from "components/Common/Breadcrumb";
import DeleteModal from "components/Common/DeleteModal";
import {
  updateProject,
  getAllProjects,
  deleteProject,
} from "helpers/firebase_helper"

const ProjectsList = () => {
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [del, setDel] = useState(false)
  const [projects, setProjects] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const { user } = useContext(UserContext)
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: project?.id ?? "",
      name: project?.name ?? "",
      budget: project?.budget ?? "",
      description: project?.description ?? "",
      status: project?.status ?? "",
      isPublish: project?.isPublish ?? "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Entrez le nom du projet"),
      description: Yup.string().required("Entrez la description du projet"),
      budget: Yup.string()
        .matches(/^[0-9]*$/, "Votre budget ne doit etre que des chiffres")
        .required("Entre le budget de votre projet"),
      status: Yup.string().required("Veuillez choisir le status du projet"),
      isPublish: Yup.string().required("Veuillez choisir l'etat du projet"),
    }),
    onSubmit: async values => {
      if (isEdit) {
        const newUpdateProject = {
          id: project?.id,
          name: values.name ?? project?.name,
          budget: values.budget ?? project?.budget,
          desc: values.description ?? project?.desc,
          status: values.status ?? project?.status,
          isPublish: values.isPublish ?? project?.isPublish,
        }
        // update project
        setLoading(!loading)
        const res = await updateProject(newUpdateProject)
        if (res.length) {
          setProjects([...res])
          setLoading(false)
          setSuccess(true)
          setIsEdit(false)
          setModal(false)
        }
      }
    },
  })

  const toggle = () => setModal(!modal)

  const handleProjectClick = arg => {
    setModal(!modal)
    setIsEdit(!isEdit)
    setProject({
      id: arg.id,
      name: arg.name,
      budget: arg.budget,
      description: arg.desc,
      status: arg.status,
      isPublish: arg.isPublish,
    })
  }


  //delete order
  const onClickDelete = arg => {
    setProject(arg)
    setDeleteModal(true)
  }

  const handleDeleteOrder = async() => {
    setLoading(!loading)
    const res = await deleteProject(project?.id)
    if(res.length) {
      setLoading(false)
      setProjects([...res])
      setDel(true)
      setDeleteModal(false)
    }
  }

  useEffect(() => {
    const getProjects = async () => {
      const res = await getAllProjects()
      setProjects([...res])
    }
    getProjects()
  }, [])

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        loading={loading}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>
            Mozah Invest | Plateforme innovante d&#39;investissement
            participative sur des projets couplés à la finance digitale
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projets" breadcrumbItem="Liste des projets" />

          <Row>
            <Col>
              {success ? (
                <UncontrolledAlert
                  color="success"
                  className="alert-dismissible fade show"
                  role="alert"
                  onClick={() => setSuccess(false)}
                >
                  <i className="mdi mdi-check-all me-2"></i>Votre projet a été
                  mis à jour avec succès.
                </UncontrolledAlert>
              ) : del ? (
                <UncontrolledAlert
                  color="danger"
                  className="alert-dismissible fade show"
                  role="alert"
                  onClick={() => setDel(false)}
                >
                  <i className="mdi mdi-check-all me-2"></i>Votre projet a été
                  supprimé.
                </UncontrolledAlert>
              ) : null}

              <Table className="project-list-table table-nowrap align-middle table-borderless">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "100px" }}>
                      ID
                    </th>
                    <th scope="col">Image</th>
                    <th scope="col">Projets</th>
                    <th scope="col">Status</th>
                    <th scope="col">Budget(€)</th>
                    {user?.type === "admin" && (
                      <th scope="col">Mettre en avant</th>
                    )}
                    {user?.type === "admin" && <th scope="col">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={project?.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={project.files[0].link}
                          alt="profile picture"
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      </td>
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
                      {user?.type === "admin" && (
                        <td>
                          <h5 className="text-truncate font-size-32">
                            <Badge
                              color={
                                project.isPublish === "Oui"
                                  ? "success"
                                  : "danger"
                              }
                            >
                              {project?.isPublish}
                            </Badge>
                          </h5>
                        </td>
                      )}
                      {user?.type === "admin" && (
                        <td style={{ cursor: "pointer" }}>
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
                      )}
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
                            Budget du projet (EUR)
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
                            type="select"
                            className="form-select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.status}
                          >
                            <option value="En attente">En attente</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option>
                          </Input>
                          {validation.touched.status &&
                          validation.errors.status ? (
                            <FormFeedback type="invalid">
                              {validation.errors.status}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Mettre en avant</Label>
                          <Input
                            name="isPublish"
                            type="select"
                            className="form-select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.isPublish}
                          >
                            <option value="Oui">Oui</option>
                            <option value="Non">Non</option>
                          </Input>
                          {validation.touched.isPublish &&
                          validation.errors.isPublish ? (
                            <FormFeedback type="invalid">
                              {validation.errors.isPublish}
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
                            Mise à jour{" "}
                            {loading ? (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            ) : null}
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>

          {projects && projects.length === 0 ? (
            <h4 className="text-center">Aucun projet disponible</h4>
          ) : projects && projects.length ? null : (
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

export default ProjectsList;
