import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { isEmpty } from "lodash"
import { Col, Container, Row, Card, CardBody, CardTitle, CardHeader } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const InvestorDetail = props => {
  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      // dispatch(onGetInvestorDetail(params.id))
    } else {
      // dispatch(onGetInvestorDetail(0)) //remove this after full integration
    }
  }, [params])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Détails investisseur | Tableau de bord | Mozas</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Investisseurs"
            breadcrumbItem="Détail investisseur"
          />

          {!isEmpty(investorDetail) && (
            <>
              <Row>
                <Col lg="8">
                  <Card>
                    <CardTitle>Investisseur</CardTitle>
                    <CardBody>
                      <p>Investisseur</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default InvestorDetail
