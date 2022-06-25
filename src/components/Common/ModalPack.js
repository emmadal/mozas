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
                    Offre Standard
                  </CardTitle>
                  <div className="d-flex flex-column">
                    <span className="fs-5 fw-bold text-center">
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-24px text-primary"></i>{" "}
                      20 jetons offerts
                    </span>
                    <span className="fs-5 fw-bold text-center">
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-24px text-primary"></i>{" "}
                      20% de Retour sur investissement
                    </span>
                  </div>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3"> 1000 €</h3>
                  <div className="text-center">
                    <button
                      className="btn btn-primary btn-block block  w-100"
                      onClick={() => navigateToPayment(project, 1000)}
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
                    Offre Premium
                  </CardTitle>
                  <div className="d-flex flex-column text-center">
                    <span className="fs-5 fw-bold text-center">
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-24px text-primary"></i>{" "}
                      50 jetons offerts
                    </span>
                    <span className="fs-5 fw-bold text-center">
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-24px text-primary"></i>{" "}
                      25% de Retour sur investissement
                    </span>
                  </div>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3"> 2500 €</h3>

                  <div className="text-center">
                    <button
                      className="btn btn-success btn-block block  w-100"
                      onClick={() => navigateToPayment(project, 2500)}
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
                    Offre Bronze
                  </CardTitle>
                  <div className="d-flex flex-column text-center">
                    <span className="fs-5 fw-bold text-center">
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-24px text-primary"></i>{" "}
                      100 jetons offerts
                    </span>
                    <span className="fs-5 fw-bold text-center">
                      <i className="mdi mdi-checkbox-marked-circle-outline mdi-24px text-primary"></i>{" "}
                      30% de Retour sur investissement
                    </span>
                  </div>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3"> 5000 €</h3>

                  <div className="text-center">
                    <button
                      className="btn btn-warning btn-block block w-100"
                      onClick={() => navigateToPayment(project, 5000)}
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
