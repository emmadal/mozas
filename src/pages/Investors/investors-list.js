import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import { Col, Container, Row, Table } from "reactstrap"
import { getAllInvestors } from "helpers/firebase_helper"
//Import Component
import Breadcrumbs from "components/Common/Breadcrumb"

const InvestorsList = () => {
  const [investors, setInvestors] = useState([])

  const computeToken = tokenArr => {
    let token = 0
    for (const i of tokenArr) {
      token += i.token
    }
    return token
  }

  const computeIncome = incomeArr => {
    let p = parseFloat("0")
    for (const i of incomeArr) {
      p += Number(i.profit)
    }
    return p
  }

  const computeInvestment = investmentArr => {
    let sum = 0
    for (const i of investmentArr) {
      sum += Number(i.amount)
    }
    return sum
  }

  useEffect(() => {
    const getInvestors = async () => {
      const res = await getAllInvestors()
      setInvestors([...res])
    }
    getInvestors()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
        <title>
          Mozah Invest | Plateforme innovante d&#39;investissement participative
          sur des projets couplée à la finance digitale
        </title>
      </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Investisseurs"
            breadcrumbItem="Liste des investisseurs"
          />

          <Row>
            <Col>
              <Table className="project-list-table table-nowrap align-middle table-borderless">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "100px" }}>
                      ID
                    </th>
                    <th scope="col">Nom</th>
                    <th scope="col">Adresse Metamask</th>
                    <th scope="col">Token gagné</th>
                    <th scope="col">Bénéfice</th>
                  </tr>
                </thead>
                <tbody>
                  {investors
                    .filter(i => i.metamask_acc.length > 0)
                    .map((investor, index) => (
                      <tr key={investor?.id}>
                        <td>{index + 1}</td>
                        <td>
                          <h5 className="text-truncate font-size-14">
                            <Link
                              to={`/investor/${investor?.uid}`}
                              className="text-dark"
                            >
                              {investor?.fullName}
                            </Link>
                          </h5>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14">
                            {investor?.metamask_acc}
                          </h5>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14">
                            {computeToken(investor?.token)}
                          </h5>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14">
                            {computeIncome(investor?.income)}
                          </h5>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          {investors && investors.length === 0 ? (
            <h4 className="text-center">Aucun investisseur disponible</h4>
          ) : investors && investors?.length ? null : (
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
}

export default InvestorsList
