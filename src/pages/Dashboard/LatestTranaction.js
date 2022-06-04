import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap"

const LatestTranaction = ({orders}) => {

  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [orderList, setOrderList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 6,
    totalSize: orders.length, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }

  const toggleViewModal = () => setModal1(!modal1)

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
      dataField: "creation_time",
      text: "Date",
      sort: true,
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {new Date(row.creation_time).toLocaleString()}
        </Link>
      ),
    },
    {
      dataField: "amount",
      text: "Montant(€)",
      sort: true,
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
  ]

  const toggle = () => {
    setModal(!modal)
  }

  const toLowerCase1 = str => {
    return str.toLowerCase()
  }

  const defaultSorted = [
    {
      dataField: "orderId",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>
      {/* <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Transactions</div>
          <PaginationProvider
            pagination={paginationFactory(pageOptions)}
            keyField="id"
            columns={EcommerceOrderColumns(toggle)}
            data={orders}
          >
            {({ paginationProps, paginationTableProps }) => (
              <ToolkitProvider
                keyField="id"
                data={orders}
                columns={EcommerceOrderColumns(toggle)}
                bootstrap4
                search
              >
                {toolkitProps => (
                  <React.Fragment>
                    <Row>
                      <Col xl="12">
                        <div className="table-responsive">
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

export default LatestTranaction
