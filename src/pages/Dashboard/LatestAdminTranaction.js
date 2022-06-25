import React, { useState } from "react"
import { Link } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { Card, CardBody, Col, Row, Badge } from "reactstrap"

const LatestAdminTranaction = ({ transaction }) => {
  const selectRow = {
    mode: "checkbox",
  }
    const [modal, setModal] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [isEdit, setIsEdit] = useState(false)


  //pagination customization
  const pageOptions = {
    sizePerPage: 6,
    totalSize: transaction.length, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  const toggleViewModal = () => setModal1(!modal1)

  const toggle = () => {
    setModal(!modal)
  }

  const toLowerCase1 = str => {
    return str.toLowerCase()
  }

  const EcommerceOrderColumns = toggleModal => [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.id}
        </Link>
      ),
    },
    {
      dataField: "fullName",
      text: "Nom & Prénoms",
      sort: true,
    },
    {
      dataField: "project_name",
      text: "Nom du projet",
      sort: true,
    },
    {
      dataField: "amount",
      text: "Montant(€)",
      sort: true,
    },
    {
      dataField: "payment_status",
      text: "Status",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Badge
          className={"font-size-12 badge-soft-" + row.badgeclass}
          color="success"
          pill
        >
          {row.payment_status}
        </Badge>
      ),
    },
    {
      dataField: "creation_time",
      text: "Date",
      sort: true,
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {new Date(row.creation_time).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Link>
      ),
    },
    {
      dataField: "payment_method",
      isDummyField: true,
      text: "Méthode de paiement",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <i
            className={
              row.paymentMethod !== "COD"
                ? "fab fa-cc-" + toLowerCase1(row.payment_method) + " me-1"
                : "fab fas fa-money-bill-alt me-1"
            }
          />{" "}
          {row.payment_method}
        </>
      ),
    },
    // {
    //   dataField: "view",
    //   isDummyField: true,
    //   text: "Voir les détails",
    //   sort: true,
    //   // eslint-disable-next-line react/display-name
    //   formatter: () => (
    //     <Button
    //       type="button"
    //       color="primary"
    //       className="btn-sm btn-rounded"
    //       onClick={toggleViewModal}
    //     >
    //       Voir Détails
    //     </Button>
    //   ),
    // },
  ]

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">
            Liste complète des transactions
          </div>
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField="id"
            columns={EcommerceOrderColumns(toggle)}
            data={transaction}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                data={transaction}
                columns={EcommerceOrderColumns(toggle)}
                bootstrap4
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    <Row>
                      <Col xl="12">
                        <div className="table-responsive text-center">
                          <BootstrapTable
                            keyField="id"
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

export default LatestAdminTranaction
