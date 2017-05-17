// @flow
import React, { Component } from 'react'
import { Button, Table, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import classnames from 'classnames'
import { StatusTypes } from '../constants'
import type { Invoice, History } from '../models'
import numeral from 'numeral'

class InvoiceList extends Component {
  static defaultProps = {
    invoices: [],
    statusFilter: StatusTypes.PAID
  }
  props: {
      statusFilter: $Keys<typeof StatusTypes>,
      invoices: Array<Invoice>,
      handleDeleteInvoice: Function,
      handleChangeStatusFilter: Function,
      history: History
  }
  render() {
    const { invoices, statusFilter, handleDeleteInvoice, handleChangeStatusFilter } = this.props
    const total:number = invoices.reduce((acc, invoice) => (acc + invoice.total), 0)

    const getInvoiceRow = (invoice) => {
      const mailSubject = encodeURI(`Invoice: ${invoice.title}`)
      const mailBody =
        `Please view your invoice at this web page: http://example.com/invoices/${invoice.id}`
      const mailTo = `mailto:?subject=${mailSubject}&body=${mailBody}`
      const overdue =
        invoice.status === StatusTypes.UNPAID && new Date(invoice.date) - new Date() <= 0
      const rowClass = classnames({ overdue })
      const editURL = `/edit/${invoice.id}`

      const stopPropagation = (e: SyntheticMouseEvent) => {
        if (e) { // Tests don't actually send an event
          e.stopPropagation()
        }
      }

      return (
        <tr
          key={invoice.id}
          className={rowClass}
          onClick={() => this.props.history.push(editURL) }
          >
          <td>{invoice.date}</td>
          <td>{invoice.title}</td>
          <td>{numeral(invoice.total).format('$0,0.00')}</td>
          <td className="status">{invoice.status}</td>
          <td>

            {/* EDIT BUTTON */}
            <Button
              className="btn-xs btn-primary"
              onClick={(e: SyntheticMouseEvent) => {
                stopPropagation(e) // Prevent row click
                this.props.history.push(editURL)
              }}
            >
              <Glyphicon glyph="pencil" />
            </Button>

            {/* MAIL BUTTON */}
            <a
              target="_blank"
              rel='noopener noreferrer'
              href={mailTo}
              onClick={(e: SyntheticMouseEvent) => stopPropagation(e)} // Prevent row click
            >
              <Button className="btn-xs btn-info">
                <Glyphicon glyph="envelope" />
              </Button>
            </a>

            {/* DELETE BUTTON */}
            <Button
              className="btn-xs btn-danger btn-delete"
              onClick={(e: SyntheticMouseEvent) => {
                stopPropagation(e) // Prevent row click
                handleDeleteInvoice(invoice.id)
              }}
            >
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
          <div className="col-xs-9">
            <LinkContainer to="/new">
              <Button bsStyle="success" bsSize="large"><Glyphicon glyph="plus" />
                {' '} New Invoice
              </Button>
            </LinkContainer>
          </div>
          <div className="col-xs-3">
            <div className="form-group">
              <label className="control-label">Status Filter</label>
              <select
                id="status-filter"
                className="form-control"
                onChange={(event) => { handleChangeStatusFilter(event.target.value) }}
                value={statusFilter}
              >
                <option value={StatusTypes.NONE}>View All</option>
                <option value={StatusTypes.UNPAID}>{StatusTypes.UNPAID}</option>
                <option value={StatusTypes.PAID}>{StatusTypes.PAID}</option>
              </select>
            </div>
          </div>
        </div>

        <Table condensed hover className="invoice-list well">
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
        <FormGroup controlId="total">
          <ControlLabel>Grand Total</ControlLabel>
          <FormControl.Static>
            {numeral(total).format('$0,0.00')}
          </FormControl.Static>
        </FormGroup>
      </div>
    )
  }
}

export default InvoiceList
