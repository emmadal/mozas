import React, { useContext } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import Avatar from "react-avatar"
import profileImg from "../../assets/images/profile-img.png"
import AuthContext from "context/AuthContext"

const WelcomeComp = () => {
  const { state } = useContext(AuthContext)

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Bienvenue !</h5>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="2">
              <div className="avatar-md profile-user-wid mb-4">
                {!state?.photo.length ? (
                  <Avatar name={state?.fullName} size="60" round={true} />
                ) : (
                  <img
                    src={state?.photo}
                    alt="Header Avatar"
                    className="img-thumbnail rounded-circle"
                  />
                )}
              </div>
            </Col>

            <Col sm="10">
              <div className="pt-4 text-center">
                <Row>
                  <Col sm="12">
                    <h5 className="font-size-20 text-truncate">
                      {state?.fullName}
                    </h5>
                    <p className="text-muted">{state?.email}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
