import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import { Col, Container, Row, Card, CardBody, CardTitle, CardHeader } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getInvestorDetail as onGetInvestorDetail } from "store/investors/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const InvestorDetail = props => {
  const dispatch = useDispatch()

  const { investorDetail } = useSelector(state => ({
    investorDetail: state.investors.investorDetail,
  }))
  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetInvestorDetail(params.id))
    } else {
      dispatch(onGetInvestorDetail(0)) //remove this after full integration
    }
  }, [params, onGetInvestorDetail])

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

InvestorDetail.propTypes = {
  match: PropTypes.object,
}

export default withRouter(InvestorDetail)
