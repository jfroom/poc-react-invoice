import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  Button, Table, FormGroup, ControlLabel, FormControl, Glyphicon
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import NumberFormat from 'react-number-format'
import { STATUS_TYPE } from '../constants'

class InvoiceForm extends Component {
  constructor(props) {
    super(props)
    const invoiceEmpty = { title: '', status: '', total: 0, items: [] }
    this.state = { invoice: props.invoice ? props.invoice : invoiceEmpty }
  }
  sumLineItems(items) {
    return items.map(item => item.price).reduce((acc, val) => (acc + val), 0)
  }
  handleItemAdd() {
    const textEl = document.querySelector('#lineitem-text')
    const priceEl = document.querySelector('#lineitem-price')
    const text = textEl.value
    let price = parseFloat(priceEl.value.trim())
    if (isNaN(price)) price = 0
    textEl.value = ''
    priceEl.value = ''

    let items = this.state.invoice.items.slice()
    items.push({ text, price })
    const total = this.sumLineItems(items)
    this.setState({ invoice: { ...this.state.invoice, items, total } })
  }
  handleItemDelete(idx) {
    let items = this.state.invoice.items.slice()
    items.splice(idx, 1)
    const total = this.sumLineItems(items)
    this.setState({ invoice: { ...this.state.invoice, items, total } })
  }
  handleSubmit(event) {
    event.preventDefault()
    const invoice = Object.assign(
      {},
      this.state.invoice,
      {
        id: this.state.invoice.id,
        title: document.querySelector('#title').value,
        status: document.querySelector('#status').value,
        notes: document.querySelector('#notes').value
      }
    )
    if (this.state.invoice.id) {
      this.props.handleEditInvoice(invoice)
    } else {
      this.props.handleAddInvoice(invoice)
    }
  }
  render() {
    const renderItems = () => {
      return (
        this.state.invoice.items.map((item, idx) =>
          <tr key={idx}>
            <td>{item.text}</td>
            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} decimalPrecision={true} prefix={'$'} /></td>
            <td>
              <Button className='btn-xs btn-danger' onClick={() => {this.handleItemDelete(idx)}}><Glyphicon glyph='trash'/></Button>
            </td>
          </tr>
        )
      )
    }
    return (
      <div className="InvoiceForm">
        <h1>{this.props.invoice ? 'Edit' : 'New'} Invoice</h1>
        <hr/>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className='row'>
            <div className='col-sm-10'>
              <FormGroup controlId='title' validationState={null}>
                <ControlLabel>Title</ControlLabel>
                <FormControl type='text' defaultValue={this.state.invoice.title} placeholder='Enter title' onChange={() => {}}/>
                <FormControl.Feedback/>
              </FormGroup>
            </div>
            <div className='col-sm-2'>
              <FormGroup controlId='status' validationState={null}>
                <ControlLabel>Status</ControlLabel>
                <FormControl componentClass="select" value={this.state.invoice.status} onChange={() => {}}>
                  <option value={STATUS_TYPE.UNPAID}>{STATUS_TYPE.UNPAID}</option>
                  <option value={STATUS_TYPE.PAID}>{STATUS_TYPE.PAID}</option>
                </FormControl>
              </FormGroup>
            </div>
          </div>


          <FormGroup controlId='line-items' validationState={null}>
            <ControlLabel>Line Items</ControlLabel>
            <div className='well'>
              <Table condensed className='line-items'>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {renderItems()}
                  <tr>
                    <td>
                      <FormGroup controlId={'lineitem-text'} validationState={null}>
                        <FormControl type='text' defaultValue='' placeholder="Enter line item"/>
                        <FormControl.Feedback/>
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup controlId={'lineitem-price'} validationState={null}>
                        <FormControl type='number' step='any' min='0' defaultValue='' placeholder="Enter price"/>
                        <FormControl.Feedback/>
                      </FormGroup>
                    </td>
                    <td>
                      <Button
                        className='btn-xs btn-success' onClick={() => {this.handleItemAdd()}}><Glyphicon glyph='plus'/> Add</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              </div>
            </FormGroup>

          <FormGroup controlId='total' validationState={null}>
            <ControlLabel>Total Due</ControlLabel>
            <FormControl.Static>
              <NumberFormat value={this.state.invoice.total} displayType={'text'} thousandSeparator={true} decimalPrecision={true} prefix={'$'} />
            </FormControl.Static>
            <FormControl.Feedback/>
          </FormGroup>

          <FormGroup controlId='notes' validationState={null}>
            <ControlLabel>Notes</ControlLabel>
            <FormControl componentClass='textArea' defaultValue={this.state.invoice.notes} placeholder='Enter notes' onChange={() => {}}/>
            <FormControl.Feedback/>
          </FormGroup>

          <div className='text-right'>
            <LinkContainer to="/" className='btn-default btn-lg' exact>
              <Button>Cancel</Button>
            </LinkContainer>
            <Button type="submit" className='btn-success btn-lg'>Save</Button>
          </div>
        </form>
        <p/>
      </div>
    )
  }
}

InvoiceForm.propTypes = {
  invoice: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired).isRequired,
    notes: PropTypes.text
  }),
  handleAddInvoice: PropTypes.func.isRequired,
  handleEditInvoice: PropTypes.func.isRequired,
}
export default InvoiceForm
