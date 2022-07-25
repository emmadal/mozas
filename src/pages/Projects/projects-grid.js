import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

//Import Cards
import CardProject from "./card-project";
import { getProjectsPublished } from "helpers/firebase_helper";


const ProjectsGrid = () => {
  const [projects, setProjects] = useState([])

  const getPusblished = async () => {
    const res = await getProjectsPublished()
    setProjects(res)
  }

  useEffect(() => {
    ;(async () => {
      await getPusblished()
    })()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Mozah Invest | Plateforme innovante d&#39;investissement
            participative sur des projets couplés à la finance digitale
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projets" breadcrumbItem="Projets mis en avant" />

          <Row>
            {/* Import Cards */}
            <CardProject projects={projects} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
};

export default ProjectsGrid;
