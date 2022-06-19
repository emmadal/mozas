import React, { useEffect, useState, useCallback } from "react"
import MetaTags from "react-meta-tags"
import { isEmpty } from "lodash"
import {useParams} from 'react-router-dom'
import { Col, Container, Row, Card, CardBody } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { getUserByUID } from "helpers/firebase_helper"
import ProjectsRelated from "pages/Dashboard/ProjectRelated"

const InvestorDetail = () => {
  const params = useParams()
  const [investorDetail, setInvestorDetail] = useState(null)

  const getInvestorById = useCallback(async () => {
    const res = await getUserByUID(params.uid)
    setInvestorDetail(res)
  }, [params])

  console.log(investorDetail)

 useEffect(() => {
   if (params && params.uid) {
     getInvestorById()
   }
 }, [params])

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

   const reports = [
     {
       title: "Nom",
       iconClass: "bx-user",
       description: investorDetail?.fullName,
     },
     {
       title: "Adresse Metamask",
       iconClass: "bx-archive-in",
       description: investorDetail?.metamask_acc,
     },
     {
       title: "Nombre de projets affiliés",
       iconClass: "bx-list-ul",
       description: investorDetail?.projects.length,
     },
     {
       title: "Jeton Gagné(s)",
       iconClass: "bx-purchase-tag-alt",
       description: computeToken(investorDetail?.token ?? []),
     },
     {
       title: "Bénéfice(€)",
       iconClass: "bx-archive-in",
       description: computeIncome(investorDetail?.income ?? []),
     },
   ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Détails investisseur | Tableau de bord | Mozah</title>
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
                <Col>
                  <Row>
                    {/* Reports Render */}
                    {reports.map((report, key) => (
                      <Col
                        md="6"
                        key={"_col_" + key}
                        className=""
                      >
                        <Card className="mini-stats-wid">
                          <CardBody>
                            <div className="d-flex">
                              <div className="flex-grow-1">
                                <p className="text-muted fw-medium">
                                  {report.title}
                                </p>
                                <h5 className="text-wrap word-wrap">
                                  {report.description}
                                </h5>
                              </div>
                              <div className="avatar-xs rounded-circle bg-primary align-self-center mini-stat-icon">
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
                    ))}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <ProjectsRelated projects={investorDetail.projects} />
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
