// @flow
import React, { Component } from 'react'
import { Button, Table, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import NumberFormat from 'react-number-format'
import classnames from 'classnames'
import { StatusTypes } from '../constants'
import type { Invoice } from '../models'

class InvoiceList extends Component {
  static defaultProps = {
    statusFilter: StatusTypes.PAID,
    handleDeleteInvoice: 1,
  }
  props: {
      statusFilter: $Keys<typeof StatusTypes>,
      invoices: Array<Invoice>,
      handleDeleteInvoice: Function,
      handleChangeStatusFilter: Function
  }
  render() {
    const { invoices, statusFilter, handleDeleteInvoice, handleChangeStatusFilter } = this.props

    const getInvoiceRow = (invoice) => {
      const mailSubject = encodeURI(`Invoice: ${invoice.title}`)
      const mailBody =
        `Please view your invoice at this web page: http://example.com/invoices/${invoice.id}`
      const mailTo = `mailto:?subject=${mailSubject}&body=${mailBody}`
      const overdue =
        invoice.status === StatusTypes.UNPAID && new Date(invoice.date) - new Date() <= 0
      const rowClass = classnames({ overdue })

      return (
        <tr key={invoice.id} className={rowClass}>
          <td>{invoice.date}</td>
          <td>{invoice.title}</td>
          <td>
            <NumberFormat
              value={invoice.total}
              displayType="text"
              prefix="$"
              thousandSeparator
              decimalPrecision
            />
          </td>
          <td className="status">{invoice.status}</td>
          <td>
            <a target="blank" href={mailTo}>
              <Button className="btn-xs btn-info"><Glyphicon glyph="envelope" /></Button>
            </a>
            <LinkContainer to={`/edit/${invoice.id}`} className="btn-xs btn-primary">
              <Button><Glyphicon glyph="pencil" /></Button>
            </LinkContainer>
            <Button className="btn-xs btn-danger" onClick={() => handleDeleteInvoice(invoice.id)}>
              <Glyphicon glyph="trash" />
            </Button>
          </td>
        </tr>
      )
    }

    return (
      <div>
        <h1>Invoices</h1>
        <hr />
        <div className="row">
          <div className="col-sm-9">
            <LinkContainer to="/new">
              <Button bsStyle="success" bsSize="large"><Glyphicon glyph="plus" />
                {' '} New Invoice
              </Button>
            </LinkContainer>
          </div>
          <div className="col-sm-3">
            <FormGroup controlId="status-filter" validationState={null}>
              <ControlLabel>Status Filter</ControlLabel>
              <FormControl
                componentClass="select"
                value={statusFilter}
                onChange={(event) => { handleChangeStatusFilter(event.target.value) }}
              >
                <option value="">View All</option>
                <option value={StatusTypes.UNPAID}>{StatusTypes.UNPAID}</option>
                <option value={StatusTypes.PAID}>{StatusTypes.PAID}</option>
              </FormControl>
            </FormGroup>
          </div>
        </div>

        <Table condensed hover className="invoice-list">
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Title</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => getInvoiceRow(invoice))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default InvoiceList
