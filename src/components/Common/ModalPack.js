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
      <ModalBody className="py-3">
        <Container fluid>
          <Row>
            <Col sm={4}>
              <Card outline color="text-primary border border-primary">
                <CardBody>
                  <CardTitle className="mb-4 fs-4 text-center text-decoration-underline">
                    Offre Standard
                  </CardTitle>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-primary"></i>{" "}
                    100 Tokens offerts
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-primary"></i>{" "}
                    20% de retour sur investissement
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-primary"></i>{" "}
                    100% de Rendement totaux
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-primary"></i>{" "}
                    12% de la valeur du Token en USDT
                  </p>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3">
                    {" "}
                    100 - 750 €
                  </h3>
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
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-success"></i>{" "}
                    300 Tokens offerts
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-success"></i>{" "}
                    25% de retour sur investissement
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-success"></i>{" "}
                    125% de Rendement totaux
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-success"></i>{" "}
                    20% de la valeur du Token en USDT
                  </p>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3">
                    {" "}
                    800 - 2500 €
                  </h3>

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
                    Offre GOLD
                  </CardTitle>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-warning"></i>{" "}
                    500 Tokens offerts
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-warning"></i>{" "}
                    30% de retour sur investissement
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-warning"></i>{" "}
                    150% de Rendement totaux
                  </p>
                  <p className="fs-5">
                    <i className="mdi mdi-checkbox-marked-circle-outline text-warning"></i>{" "}
                    30% de la valeur du Token en USDT
                  </p>
                  <hr className="text-muted" />
                  <h3 className="fw-bold fs-3 text-center my-3">
                    {" "}
                    2750 - 10000 €
                  </h3>

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
