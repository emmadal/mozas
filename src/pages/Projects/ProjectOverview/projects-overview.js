import React, { useCallback, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { isEmpty } from "lodash";
import { Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import ModalPack from "components/Common/ModalPack";

import ProjectDetail from "./projectDetail";
import TeamMembers from "./teamMembers";
import AttachedFiles from "./attachedFiles";
import { useParams } from "react-router-dom";

//firebase
import { getProjectsDetails } from "helpers/firebase_helper";

const ProjectsOverview = () => {
  const [projectDetail, setProjectDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const params = useParams()

  const getProjectById = useCallback(async () => {
    const res = await getProjectsDetails(params.id)
    setProjectDetail(res)
  }, [params])

  useEffect(() => {
    if (params && params.id) {
      getProjectById()
    }
  }, [params]);

  const handleOffer = () => setShowModal(!showModal)

  return (
    <React.Fragment>
      <ModalPack
        show={showModal}
        onCloseClick={() => setShowModal(false)}
        project={projectDetail}
      />
      <div className="page-content">
        <MetaTags>
          <title>Resumé du projet | Tableau de bord | Mozah</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projets" breadcrumbItem="Resumé du projet" />

          {!isEmpty(projectDetail) && (
            <>
              <Row>
                <Col sm="8">
                  <ProjectDetail project={projectDetail} />
                </Col>

                <Col sm="4">
                  <TeamMembers team={projectDetail?.team} />
                </Col>
              </Row>

              <Row>
                {/* <Col lg="4">
                  <OverviewChart options={options} series={series} />
                </Col> */}

                <Col sm="8">
                  <AttachedFiles files={projectDetail?.files} />
                </Col>

                <Col sm="4">
                  {/* <Comments comments={projectDetail?.comments} /> */}
                </Col>
              </Row>
              <div className="text-center my-5">
                <button
                  className="btn btn-danger btn-block"
                  onClick={handleOffer}
                >
                  Investir dans ce projet
                </button>
              </div>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
};

export default ProjectsOverview;
