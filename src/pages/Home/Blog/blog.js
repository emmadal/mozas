import React from "react"
import { Container, Row, Col } from "reactstrap"

//Import Images
import securite from "assets/images/mozah/securite.jpeg"
import cacao from "assets/images/mozah/cacao.jpeg"
import formation from "assets/images/mozah/formation.jpeg"

const Blog = () => {
  const blogs = [
    {
      imgUrl: securite,
      tag: "Sécurité",
      title: "Entreprise de Sécurité Privée ",
      desc: "Surveillance humaine ou Surveillance par système électronique de sécurité",
    },
    {
      imgUrl: cacao,
      tag: "Agro-industriel",
      title:
        "Agro-industriel ( transformation et conservation fruits et légumes)",
      desc: "création d'unités de transformation des fruits et légumes par déshydratation pour la conservation. Régler le problème de gaspillage de nos fruits et légumes par la conservation sur le long terme gage d'autosuffisance alimentaires",
    },
    {
      imgUrl: formation,
      tag: "Education",
      title: "École/ Institut",
      desc: "Création de chaînes d’écoles privées de la maternelle au secondaire et d'Institut de Formation Professionnelle Diplomante pour répondre aux objectifs de l'UNESCO de faire de l'éducation une priorité.",
    },
  ]
  return (
    <React.Fragment>
      <section className="section bg-white" id="news">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="fs-2 fw-light">Projets</div>
                <p className="fs-3 fw-bold">Quelques Projets</p>
              </div>
            </Col>
          </Row>

          <Row>
            {blogs.map((blog, key) => (
              <Col xl="4" sm="6" key={key}>
                <div className="blog-box mb-4 mb-xl-0">
                  <div className="position-relative">
                    <img
                      src={blog.imgUrl}
                      alt=""
                      className="rounded img-fluid mx-auto d-block"
                    />
                    <div className="badge badge-success blog-badge font-size-11">
                      {blog.tag}
                    </div>
                  </div>

                  <div className="mt-4 text-muted">
                    <h5 className="mb-3">{blog.title}</h5>
                    <p>{blog.desc}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Blog
