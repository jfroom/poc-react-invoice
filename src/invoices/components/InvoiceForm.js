// @flow
import React, { Component } from 'react'
import {
  Button, Table, FormGroup, ControlLabel, FormControl, Glyphicon,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { StatusTypes } from '../constants'
import type { InvoiceItem, Invoice } from '../models'
import numeral from 'numeral'

export type Props = {
  invoice: Invoice,
  handleAddInvoice: Function,
  handleEditInvoice: Function
}
type DefaultProps = {
  invoice: Invoice,
  handleAddInvoice: Function,
  handleEditInvoice: Function,
}
type State = {
  invoice: Invoice,
  lineItemText: string,
  lineItemPrice: string
}

const emptyInvoice = (): Invoice => (
  { id: -1, title: '', date: '', status: StatusTypes.UNPAID, total: 0, notes: '', items: [] }
)

class InvoiceForm extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    invoice: emptyInvoice(),
    handleAddInvoice: () => {},
    handleEditInvoice: () => {},
  }
  static sumLineItems(items: Array<InvoiceItem>) {
    return items.reduce((acc, item) => (acc + item.price), 0)
  }
  constructor(props: Props) {
    super(props)
    this.state = { ...this.state, invoice: props.invoice }

    const self: any = this
    self.handleChange = this.handleChange.bind(this)
    self.handleSubmit = this.handleSubmit.bind(this)
    self.handleItemAdd = this.handleItemAdd.bind(this)
  }
  state = { invoice: emptyInvoice(), lineItemText: '', lineItemPrice: '' }

  handleChange(event: SyntheticInputEvent) {
    const target:any = event.currentTarget

    // Intermediate line item inputs go into state directly
    if (['lineItemText', 'lineItemPrice'].includes(target.id)) {
      this.setState({ [target.id]: target.value })
    } else {
      // Invoice title, status, etc. go into invoice item
      this.setState({
        invoice: {
          ...this.state.invoice,
          [target.id]: target.value
        }
      })
    }
  }
  handleItemAdd() {
    let price:number = parseFloat(this.state.lineItemPrice.trim())
    if (isNaN(price)) price = 0

    // Add items to state
    const items: Array<InvoiceItem> = this.state.invoice.items.slice()
    items.push({
      text: this.state.lineItemText,
      price
    })
    const total = InvoiceForm.sumLineItems(items)
    this.setState({
      invoice: { ...this.state.invoice, items, total },
      lineItemText: '',
      lineItemPrice: ''
    })
  }
  handleItemDelete(idx: number) {
    const items: Array<InvoiceItem> = this.state.invoice.items.slice()
    items.splice(idx, 1)
    const total = InvoiceForm.sumLineItems(items)
    this.setState({ invoice: { ...this.state.invoice, items, total } })
  }
  handleSubmit(event: Event) {
    event.preventDefault() // Don't actually try to submit form to page
    const { handleEditInvoice, handleAddInvoice } = this.props
    const invoice = this.state.invoice
    if (invoice.id > -1) {
      handleEditInvoice(invoice)
    } else {
      handleAddInvoice(invoice)
    }
  }
  render() {
    const { invoice } = this.state
    const renderItems = () => (
      invoice.items.map((item, idx) => (
        <tr key={idx}>
          <td>{item.text}</td>
          <td>{numeral(item.price).format('$0,0.00')}</td>
          <td>
            <Button
              className="btn-xs btn-danger btn-delete-item"
              onClick={() => this.handleItemDelete(idx)}
            >
              <Glyphicon glyph="trash" />
            </Button>
          </td>
        </tr>
      ))
    )
    return (
      <div className="InvoiceForm">
        <h1>{invoice.id > -1 ? 'Edit' : 'New'} Invoice</h1>
        <hr />
        <form id="form" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-sm-8">
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  value={invoice.title}
                  placeholder="Enter title"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <div className="col-sm-2">
              <FormGroup controlId="date">
                <ControlLabel>Due Date</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Ex. 1/1/2017"
                  value={invoice.date}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <div className="col-sm-2">
              <FormGroup controlId="status">
                <ControlLabel>Status</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={invoice.status}
                  onChange={this.handleChange}
                >
                  <option value={StatusTypes.UNPAID}>{StatusTypes.UNPAID}</option>
                  <option value={StatusTypes.PAID}>{StatusTypes.PAID}</option>
                </FormControl>
              </FormGroup>
            </div>
          </div>

          <FormGroup controlId="line-items">
            <ControlLabel>Line Items</ControlLabel>
            <div className="well">
              <Table condensed className="line-items">
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
                      <FormGroup controlId="lineItemText">
                        <FormControl
                          type="text"
                          value={this.state.lineItemText}
                          placeholder="Enter line item"
                          id="lineItemText"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup controlId="lineItemPrice">
                        <FormControl
                          type="number"
                          step="any"
                          min="0"
                          value={this.state.lineItemPrice}
                          placeholder="Enter price"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </td>
                    <td>
                      <Button
                        id="add-item-btn"
                        className="btn-xs
                        btn-success"
                        onClick={this.handleItemAdd}
                      >
                        <Glyphicon glyph="plus" /> Add
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </FormGroup>

          <FormGroup controlId="total">
            <ControlLabel>Total Due</ControlLabel>
            <FormControl.Static>
              {numeral(invoice.total).format('$0,0.00')}
            </FormControl.Static>
          </FormGroup>

          <FormGroup controlId="notes">
            <ControlLabel>Notes</ControlLabel>
            <FormControl
              componentClass="textArea"
              value={invoice.notes}
              placeholder="Enter notes"
              onChange={ this.handleChange}
            />
          </FormGroup>

          <div className="text-right">
            <LinkContainer to="/" className="btn-default btn-lg" exact>
              <Button>Cancel</Button>
            </LinkContainer>
            <Button type="submit" id="submit" className="btn-success btn-lg">Save</Button>
          </div>
        </form>
        <p />
      </div>
    )
  }
}

export default InvoiceForm
