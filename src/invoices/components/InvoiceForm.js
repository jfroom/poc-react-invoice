// @flow
import React, { Component } from 'react'
import {
  Button, Table, FormGroup, ControlLabel, FormControl, Glyphicon,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import NumberFormat from 'react-number-format'
import { StatusTypes } from '../constants'
import type { InvoiceItem, Invoice } from '../models'

type Props = {
  invoice: Invoice,
  handleAddInvoice: Function,
  handleEditInvoice: Function,
}
type DefaultProps = {
  invoice: Invoice,
  handleAddInvoice: Function,
  handleEditInvoice: Function,
}
type State = {
  invoice: Invoice,
}
const emptyInvoice = (): Invoice => (
  { id: -1, title: '', date: '', status: '', total: 0, notes: '', items: [] }
)

class InvoiceForm extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    invoice: emptyInvoice(),
    handleAddInvoice: () => {},
    handleEditInvoice: () => {},
  }
  static sumLineItems(items: Array<InvoiceItem>) {
    return items.map(item => item.price).reduce((acc, val) => (acc + val), 0)
  }
  constructor(props: Props) {
    super(props)
    this.state = { invoice: props.invoice }
  }
  state = { invoice: emptyInvoice() }

  handleStatusChange(status: string) {
    this.setState({ invoice: { ...this.state.invoice, status } })
  }
  handleItemAdd() {
    // Parse items types & clear input elements
    const textEl:?HTMLElement = document.querySelector('#lineitem-text')
    if (!(textEl instanceof HTMLInputElement)) throw new Error('Expecting HTMLInputElement')
    const text:string = textEl.value
    textEl.value = ''

    const priceEl:?HTMLElement = document.querySelector('#lineitem-price')
    if (!(priceEl instanceof HTMLInputElement)) throw new Error('Expecting HTMLInputElement')
    let price:number = parseFloat(priceEl.value.trim())
    if (isNaN(price)) price = 0
    priceEl.value = ''

    // Add items to state
    const items: Array<InvoiceItem> = this.state.invoice.items.slice()
    items.push({ text, price })
    const total = InvoiceForm.sumLineItems(items)
    this.setState({ invoice: { ...this.state.invoice, items, total } })
  }
  handleItemDelete(idx: number) {
    const items: Array<InvoiceItem> = this.state.invoice.items.slice()
    items.splice(idx, 1)
    const total = InvoiceForm.sumLineItems(items)
    this.setState({ invoice: { ...this.state.invoice, items, total } })
  }
  handleSubmit(event: Event) {
    event.preventDefault()
    const { handleEditInvoice, handleAddInvoice } = this.props

    const titleEl:?HTMLElement = document.querySelector('#title')
    const dateEl:?HTMLElement = document.querySelector('#date')
    const notesEl:?HTMLElement = document.querySelector('#notes')
    if (!(titleEl instanceof HTMLInputElement)) throw new Error('Expecting HTMLInputElement')
    if (!(dateEl instanceof HTMLInputElement)) throw new Error('Expecting HTMLInputElement')
    if (!(notesEl instanceof HTMLTextAreaElement)) throw new Error('Expecting HTMLTextAreaElement')

    const invoice = {
      ...this.state.invoice,
      id: this.state.invoice.id,
      title: titleEl.value,
      date: dateEl.value,
      status: this.state.invoice.status,
      notes: notesEl.value,
    }

    if (this.state.invoice.id > -1) {
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
          <td>
            <NumberFormat
              value={item.price}
              displayType="text"
              prefix="$"
              thousandSeparator
              decimalPrecision
            />
          </td>
          <td>
            <Button
              className="btn-xs btn-danger"
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
        <form onSubmit={event => this.handleSubmit(event)}>
          <div className="row">
            <div className="col-sm-8">
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  defaultValue={invoice.title}
                  placeholder="Enter title"
                  onChange={() => {}}
                />
              </FormGroup>
            </div>
            <div className="col-sm-2">
              <FormGroup controlId="date">
                <ControlLabel>Due Date</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Ex. 1/1/2017"
                  defaultValue={invoice.date}
                  onChange={() => {}}
                />
              </FormGroup>
            </div>
            <div className="col-sm-2">
              <FormGroup controlId="status">
                <ControlLabel>Status</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={invoice.status}
                  onChange={(event) => { this.handleStatusChange(event.target.value) }}
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
                      <FormGroup controlId="lineitem-text">
                        <FormControl type="text" defaultValue="" placeholder="Enter line item" />
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup controlId="lineitem-price">
                        <FormControl
                          type="number"
                          step="any"
                          min="0"
                          defaultValue=""
                          placeholder="Enter price"
                        />
                      </FormGroup>
                    </td>
                    <td>
                      <Button
                        className="btn-xs
                        btn-success"
                        onClick={() => { this.handleItemAdd() }}
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
              <NumberFormat
                value={invoice.total}
                displayType="text"
                prefix="$"
                thousandSeparator
                decimalPrecision
              />
            </FormControl.Static>
          </FormGroup>

          <FormGroup controlId="notes">
            <ControlLabel>Notes</ControlLabel>
            <FormControl
              componentClass="textArea"
              defaultValue={invoice.notes}
              placeholder="Enter notes"
              onChange={() => {}}
            />
          </FormGroup>

          <div className="text-right">
            <LinkContainer to="/" className="btn-default btn-lg" exact>
              <Button>Cancel</Button>
            </LinkContainer>
            <Button type="submit" className="btn-success btn-lg">Save</Button>
          </div>
        </form>
        <p />
      </div>
    )
  }
}

export default InvoiceForm
