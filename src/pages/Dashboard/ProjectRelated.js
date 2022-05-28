import React, {useContext} from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"

// datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { UserContext } from "App"

import "./datatables.scss"

const ProjectsRelated = () => {
  const { user } = useContext(UserContext)

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "Projet",
      sort: true,
    },
    {
      dataField: "amount_invested",
      text: "Montant investi",
      sort: true,
    },
    {
      dataField: "token",
      text: "Jeton gagné",
      sort: true,
    },
    {
      dataField: "startDate",
      text: "Date de début",
      sort: true,
    },
    {
      dataField: "endDate",
      text: "Date de fin",
      sort: true,
    },
  ]

  // Table Data
  const productData = user?.projects

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  }

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "Tout", value: productData.length },
  ]

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const { SearchBar } = Search

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Projets affiliés</CardTitle>
          <div className="d-sm-flex flex-wrap">
            <PaginationProvider
              pagination={paginationFactory(pageOptions)}
              keyField="id"
              columns={columns}
              data={productData}
            >
              {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider
                  keyField="id"
                  columns={columns}
                  data={productData}
                  search
                >
                  {toolkitProps => (
                    <React.Fragment>
                      <Row className="mb-2">
                        <Col md="4">
                          <div className="search-box me-2 mb-2 d-inline-block">
                            <div className="position-relative">
                              <SearchBar {...toolkitProps.searchProps} />
                              <i className="bx bx-search-alt search-icon" />
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col sm="12">
                          <div className="table-responsive">
                            <BootstrapTable
                              keyField={"id"}
                              responsive
                              bordered={false}
                              striped={false}
                              defaultSorted={defaultSorted}
                              selectRow={selectRow}
                              classes={"table align-middle table-nowrap table-check"}
                              headerWrapperClasses={"thead-light"}
                              {...toolkitProps.baseProps}
                              {...paginationTableProps}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="align-items-md-center mt-30">
                        <Col className="inner-custom-pagination d-flex">
                          <div className="d-inline">
                            <SizePerPageDropdownStandalone
                              {...paginationProps}
                            />
                          </div>
                          <div className="text-md-right ms-auto">
                            <PaginationListStandalone {...paginationProps} />
                          </div>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                </ToolkitProvider>
              )}
            </PaginationProvider>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ProjectsRelated
