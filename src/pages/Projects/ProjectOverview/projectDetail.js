import React from "react";
import { map, get } from "lodash";
import { Card, CardBody, Col, Row } from "reactstrap";

const ProjectDetail = ({ project }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <img
            src={`${project?.files[0]?.link}`}
            alt=""
            className="avatar-md me-4 img-fluid"
          />

          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-15">{project?.name}</h5>
          </div>
        </div>

        <h5 className="font-size-15 mt-4">Détails du projet :</h5>

        <p className="text-muted text-wrap word-wrap">{project?.desc}</p>

        <div className="text-muted mt-4">
          {project.projectDetails &&
            map(project.projectDetails.points, (point, index) => (
              <p key={index}>
                <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                {point}
              </p>
            ))}
        </div>

        <Row className="task-dates">
          <Col sm="4" xs="6">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar me-1 text-primary" /> Date de début
              </h5>
              <p className="text-muted mb-0">{project?.startDate}</p>
            </div>
          </Col>

          <Col sm="4" xs="6">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar-check me-1 text-primary" /> Date de
                fin
              </h5>
              <p className="text-muted mb-0">{project?.dueDate}</p>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
};

export default ProjectDetail;
