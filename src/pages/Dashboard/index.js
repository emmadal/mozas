import React, { useContext, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import ProjectsRelated from "./ProjectRelated";
import LatestTranaction from "./LatestTranaction";
import LatestAdminTranaction from "./LatestAdminTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { UserContext } from "App";
import {
  getTransactions,
  getUserByUID,
  getAllTransactions,
  getRelatedProject,
} from "helpers/firebase_helper"

const Dashboard = () => {
  const [modal, setmodal] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [relatedProject, setRelatedProject] = useState([])
  const { user, setUser } = useContext(UserContext)

  const getUser = async () => {
    const res = await getUserByUID(user?.uid)
    setUser(res)
  }

  const getUserTransactions = async () => {
    if(user.type === "user") {
      const relatedProjec = await getRelatedProject()
      const getTrans = await getTransactions(user?.uid)
      setRelatedProject([...relatedProjec.filter(e => e.uid === user.uid)])
      setTransactions([...getTrans])
    }
    if (user.type === "admin") {
      const res = await getAllTransactions()
      setTransactions([...res])
    }
  }

  const computeToken = tokenArr => {
    let token = 0
    for (const i of tokenArr) {
      token += i.token
    }
    return token
  }

  const computeIncome = incomeArr => {
    let p = 0
    for (const i of incomeArr) {
      p += i.income
    }
    return p
  }

  const computeInvestment = investmentArr => {
    let sum = 0
    for (const i of investmentArr) {
      sum += Number(i.amount_invested)
    }
    return sum
  }

  const reports = [
    {
      title: "Projets",
      iconClass: "bx-list-ul",
      description: relatedProject?.length ?? 0,
    },
    {
      title: "Financement(€)",
      iconClass: "bx-money",
      description: computeInvestment(relatedProject ?? []),
    },
    {
      title: "Jeton",
      iconClass: "bx-purchase-tag-alt",
      description: computeToken(relatedProject ?? []),
    },
    {
      title: "Bénéfice(€)",
      iconClass: "bx-archive-in",
      description: computeIncome(relatedProject ?? []),
    },
  ]

  const adminReports = [
    {
      title: "Total Projets",
      iconClass: "bx-list-ul",
      description: 0,
    },
    {
      title: "Montant Total",
      iconClass: "bx-money",
      description: 0,
    },
    {
      title: "Benefice(€)",
      iconClass: "bx-archive-in",
      description: 0,
    },
  ]

  useEffect(() => {
    ;(async () => {
      await getUser()
    })()
  }, [])

  useEffect(() => {
    (async () => {
      await getUserTransactions()
    })()
  }, [])
  
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Mozah Invest | Plateforme innovante d&#39;investissement
            participative sur des projets couplée à la finance digitale
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Page d'accueil" breadcrumbItem="Page d'accueil" />

          <Row>
            <Col sm="4">
              <WelcomeComp />
            </Col>
            <Col sm="8">
              <Row>
                {/* Reports Render */}
                {(user.type === "user" ? reports : adminReports).map(
                  (report, key) => (
                    <Col md="4" key={"_col_" + key}>
                      <Card className="mini-stats-wid">
                        <CardBody>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <p className="text-muted fw-medium">
                                {report.title}
                              </p>
                              <h4 className="mb-0">{report.description}</h4>
                            </div>
                            <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                              <span className="avatar-title rounded-circle bg-primary">
                                <i
                                  className={
                                    "bx " + report.iconClass + " font-size-24"
                                  }
                                ></i>
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  )
                )}
              </Row>
            </Col>
          </Row>

          <Row>
            <Col sm="12">
              {user.type === "user" ? (
                <ProjectsRelated projects={relatedProject} />
              ) : null}
            </Col>
          </Row>

          <Row>
            <Col sm="12">
              {user.type === "user" ? (
                <LatestTranaction transaction={transactions} />
              ) : (
                <LatestAdminTranaction transaction={transactions} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal)
        }}
      >
        <div>
          <ModalHeader
            toggle={() => {
              setmodal(!modal)
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal)
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  )
};


export default Dashboard;
