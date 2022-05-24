import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import {
  Col,
  Container,
  Row,
  Table,
} from "reactstrap"

//Import Component
import Breadcrumbs from "components/Common/Breadcrumb"

const InvestorsList = () => {
  const investors = []

  useEffect(() => {
    // dispatch(onGetInvestorsSuccess())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Liste des investisseurs | Mozas - Admin</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Investisseurs" breadcrumbItem="Liste des investisseurs" />

          <Row>
            <Col>
              <Table className="project-list-table table-nowrap align-middle table-borderless">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "100px" }}>
                      ID
                    </th>
                    <th scope="col">Nom</th>
                    <th scope="col">Pays</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Projets</th>
                    <th scope="col">Investissement</th>
                  </tr>
                </thead>
                <tbody>
                  {map(investors, (investor, index) => (
                    <tr key={investor?.id}>
                      <td>{index + 1}</td>
                      <td>
                        <h5 className="text-truncate font-size-14">
                          <Link
                            to={`/investor-detail/${investor?.id}`}
                            className="text-dark"
                          >
                            {investor?.name}
                          </Link>
                        </h5>
                      </td>
                      <td>
                        <h5 className="text-truncate font-size-14">
                          {investor?.country}
                        </h5>
                      </td>
                      <td>
                        <h5 className="text-truncate font-size-14">
                          {investor?.address}
                        </h5>
                      </td>
                      <td>
                        <h5 className="text-truncate font-size-14">
                          {investor?.investors?.length}
                        </h5>
                      </td>
                      <td>
                        <h5 className="text-truncate font-size-14">
                          {investor?.globalInvestment}
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

export default withRouter(InvestorsList)
