import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { isEmpty } from "lodash";
import { Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import ProjectDetail from "./projectDetail";
import TeamMembers from "./teamMembers";
import AttachedFiles from "./attachedFiles";
import Comments from "./comments";
import { useParams } from "react-router-dom";

//redux

const ProjectsOverview = () => {
  const projectDetail = {}
  const params = useParams()


  useEffect(() => {
    if (params && params.id) {
      // dispatch(onGetProjectDetail(params.id));
    } else {
      // dispatch(onGetProjectDetail(0)); //remove this after full integration
    }
  }, [params]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Resumé du projet | Tableau de bord | Mozas</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projets" breadcrumbItem="Resumé du projet" />

          {!isEmpty(projectDetail) && (
            <>
              <Row>
                <Col lg="8">
                  <ProjectDetail project={projectDetail} />
                </Col>

                <Col lg="4">
                  <TeamMembers team={projectDetail?.team} />
                </Col>
              </Row>

              <Row>
                {/* <Col lg="4">
                  <OverviewChart options={options} series={series} />
                </Col> */}

                <Col sm="6">
                  <AttachedFiles files={projectDetail?.files} />
                </Col>

                <Col sm="6">
                  <Comments comments={projectDetail?.comments} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
};

export default ProjectsOverview;
