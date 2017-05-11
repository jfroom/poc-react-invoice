import React, {Component} from 'react';
import {Button, Table, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

class InvoiceList extends Component {
  render() {
    const { invoices, handleDeleteInvoice } = this.props

    const getMailToLink = (invoice) => {
      const subject = encodeURI("Invoice: " + invoice.title)
      const body = "Please view your invoice at this web page: http://example.com/invoices/" + invoice.id
      return "mailto:?subject=" + subject + "&body=" + body
    }
    return (
      <div>
        <h1>Invoices</h1>
        <hr/>

        <div className='col-sm-12 text-right'>
          <LinkContainer to="/new">
            <Button bsStyle='success' bsSize='large'><Glyphicon glyph='plus'/> New Invoice</Button>
          </LinkContainer>
        </div>
        <p/>

        <Table condensed hover className='invoice-list'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice =>
              <tr key={invoice.id}>
                <td>{invoice.title}</td>
                <td><NumberFormat value={invoice.total} displayType={'text'} thousandSeparator={true} decimalPrecision={true} prefix={'$'} /></td>
                <td>{invoice.status}</td>
                <td>
                  <a target='blank' href={getMailToLink(invoice)}><Button className='btn-xs btn-info'><Glyphicon glyph='envelope'/></Button></a>
                  <LinkContainer to={"/edit/" + invoice.id} className='btn-xs btn-primary'>
                    <Button><Glyphicon glyph='pencil'/></Button>
                  </LinkContainer>
                  <Button className='btn-xs btn-danger' onClick={() => handleDeleteInvoice(invoice.id)}><Glyphicon glyph='trash'/></Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

InvoiceList.propTypes = {
  invoices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired).isRequired,
    notes: PropTypes.text
  }).isRequired).isRequired,
  handleDeleteInvoice: PropTypes.func.isRequired
}

export default InvoiceList
