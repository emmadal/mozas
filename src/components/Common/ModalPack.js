import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
} from "reactstrap"

const ModalPack = ({ show, onCloseClick, project }) => {
  const navigate = useNavigate()

  const navigateToPayment = (project, amount) => {
    navigate(`/payment/${project?.id}/${amount}`, { state: { project } })
  }

  return (
    <Modal isOpen={show} toggle={onCloseClick} size="xl">
      <ModalHeader className="fw-bold fs-">
        Veuillez choisir les offres pour les investissements
      </ModalHeader>
      <ModalBody className="py-3 px-5">
        <Container fluid>
          <Row>
            <Col sm={4}>
              <Card outline color="text-primary border border-primary">
                <CardBody>
                  <CardTitle className="mb-4 fs-4 text-center text-decoration-underline">
                    Standard
                  </CardTitle>
                  <div className="d-flex flex-column text-center">
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-primary me-4"></i>{" "}
                      20 jetons
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-primary me-4"></i>{" "}
                      Lorem
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-primary me-4"></i>{" "}
                      Lorem
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-primary me-4"></i>{" "}
                      Lorem
                    </span>
                  </div>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3">
                    {" "}
                    150 000 FCFA
                  </h3>
                  <div className="text-center">
                    <button
                      className="btn btn-primary btn-block block  w-100"
                      onClick={() => navigateToPayment(project, 150000)}
                    >
                      Investir
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={4}>
              <Card outline color="text-success border border-success">
                <CardBody>
                  <CardTitle className="mb-4 fs-4 text-center text-decoration-underline">
                    Premium
                  </CardTitle>
                  <div className="d-flex flex-column text-center">
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-success me-4"></i>{" "}
                      40 jetons
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-success me-4"></i>{" "}
                      Lorem
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-success me-4"></i>{" "}
                      Lorem
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-success me-4"></i>{" "}
                      Lorem
                    </span>
                  </div>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3">
                    {" "}
                    250 000 FCFA
                  </h3>

                  <div className="text-center">
                    <button
                      className="btn btn-success btn-block block  w-100"
                      onClick={() => navigateToPayment(project, 250000)}
                    >
                      Investir
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={4}>
              <Card outline color="text-warning border border-warning">
                <CardBody>
                  <CardTitle className="mb-4 fs-4 text-center text-decoration-underline">
                    Bronze
                  </CardTitle>
                  <div className="d-flex flex-column text-center">
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-warning me-4"></i>{" "}
                      100 jetons
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-warning me-4"></i>{" "}
                      Lorem
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-warning me-4"></i>{" "}
                      Lorem
                    </span>
                    <span>
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-18px text-warning me-4"></i>{" "}
                      Lorem
                    </span>
                  </div>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3">
                    {" "}
                    300 000 FCFA
                  </h3>

                  <div className="text-center">
                    <button
                      className="btn btn-warning btn-block block w-100"
                      onClick={() => navigateToPayment(project, 300000)}
                    >
                      Investir
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  )
}

export default ModalPack
