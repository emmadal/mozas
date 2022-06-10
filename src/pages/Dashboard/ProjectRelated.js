import React, {useContext, useState} from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import { Link } from "react-router-dom"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { UserContext } from "App"

const ProjectsRelated = () => {
  const { user } = useContext(UserContext)
    const [modal, setModal] = useState(false)
    const [modal1, setModal1] = useState(false)

  const columns = [
    {
      dataField: "projectId",
      text: "ID",
      sort: true,
    },
    {
      dataField: "project_name",
      text: "Projet",
      sort: true,
    },
    {
      dataField: "project_budget",
      text: "Budget du projet(€)",
      sort: true,
    },
    {
      dataField: "amount_invested",
      text: "Montant investi(€)",
      sort: true,
    },
    {
      dataField: "token",
      text: "Jeton gagné",
      sort: true,
    },
    {
      dataField: "startDate",
      text: "Debut",
      sort: true,
    },
    {
      dataField: "endDate",
      text: "Fin",
      sort: true,
    },
  ]

  const toggle = () => {
    setModal(!modal)
  }

  // Table Data
  const productData = user?.projects

  const defaultSorted = [
    {
      dataField: "projectId",
      order: "asc",
    },
  ]

  // Custom Pagination Toggle
  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  }

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const { SearchBar } = Search

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Projet affiliés</div>
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField="projectId"
            columns={columns}
            data={productData}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="projectId"
                data={productData}
                columns={columns}
                bootstrap4
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    <Row>
                      <Col xl="12">
                        <div className="table-responsive">
                          <BootstrapTable
                            keyField="projectId"
                            responsive
                            bordered={false}
                            striped={false}
                            defaultSorted={defaultSorted}
                            selectRow={selectRow}
                            classes={
                              "table align-middle table-nowrap table-check"
                            }
                            headerWrapperClasses={"table-light"}
                            {...toolkitProps.baseProps}
                            {...paginationTableProps}
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="pagination pagination-rounded justify-content-end">
                      <PaginationListStandalone {...paginationProps} />
                    </div>
                  </React.Fragment>
                )}
              </ToolkitProvider>
            )}
          </PaginationProvider>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ProjectsRelated
