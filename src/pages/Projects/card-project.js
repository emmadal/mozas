import React from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import {
  Badge,
  Card,
  CardBody,
  Col,
  UncontrolledTooltip,
  CardTitle,
  CardSubtitle,
  Row
} from "reactstrap"

const CardProject = ({ projects }) => {
  return (
    <React.Fragment>
      {projects && projects.length === 0 ? (
        <h4 className="text-center">Aucun projet mis en avant</h4>
      ) : projects && projects.length ? null : (
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

      {map(projects, (project, key) => (
        <Col xl="4" sm="6" key={key}>
          <Card>
            <CardBody>
              <CardTitle>
                <Link
                  to={`/projects-overview/${project.id}`}
                  className="text-dark"
                >
                  {project?.name}
                </Link>
              </CardTitle>
              <CardSubtitle className="mb-3">{project?.desc}</CardSubtitle>
            </CardBody>
            <div className="px-4 py-3 border-top">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3">
                  <Badge
                    color={
                      project.status === "En attente"
                        ? "primary"
                        : project.status === "Terminé"
                        ? "success"
                        : project.status === "En cours"
                        ? "info"
                        : ""
                    }
                  >
                    {project?.status}
                  </Badge>
                </li>
                <li className="list-inline-item me-3" id="dueDate">
                  <i className="bx bx-calendar me-1" /> {project.dueDate}
                  <UncontrolledTooltip placement="top" target="dueDate">
                    Date de fin
                  </UncontrolledTooltip>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
};

export default CardProject;