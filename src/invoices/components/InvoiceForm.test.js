import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import InvoiceForm from './InvoiceForm'
import { StatusTypes } from '../constants'
import { BrowserRouter as Router } from 'react-router-dom'

let props = {}
let handleAddInvoice
let handleEditInvoice

const setField = (wrap, id, val) => {
  let input = wrap.find(`#${id}`).first()
  input.node.value = val
  input.simulate('change', input)
}

const testInvoice = {
  title: 'Test title',
  date: '1/2/2017',
  status: StatusTypes.PAID,
  notes: 'Test notes',
  items: [
    { text: 'test item 1', price: 7.77 },
    { text: 'test item 1', price: 1.21 }
  ]
}
beforeEach( () => {
  handleAddInvoice = jest.fn()
  handleEditInvoice = jest.fn()
  props = { handleAddInvoice, handleEditInvoice }
})

it('new invoice', () => {
  // Mount & verify snapshot
  const wrap = mount(<Router><InvoiceForm {...props} /></Router>)
  expect(toJson(wrap)).toMatchSnapshot()
  expect(wrap.find('h1')).toHaveText('New Invoice')

  // Populate fields
  let invoice = { ...testInvoice, id: -1 }
  const fields = ['title', 'date', 'status', 'notes']
  fields.forEach( field => {
    setField(wrap, field, invoice[field])
  })

  // Populate line-item fields
  invoice.items.forEach((item) => {
    setField(wrap, 'lineItemText', item.text)
    setField(wrap, 'lineItemPrice', item.price)
    wrap.find('#add-item-btn').first().simulate('click')
  })

  // Submit & verify
  wrap.find('#form').first().simulate('submit')
  invoice.total = 8.98
  expect(handleAddInvoice.mock.calls).toEqual([[invoice]])
})

it('edit invoice', () => {
  let invoice = { ...testInvoice, id: 1 }
  props.invoice = invoice

  // Mount & verify snapshot
  const wrap = mount(<Router><InvoiceForm {...props} /></Router>)
  expect(toJson(wrap)).toMatchSnapshot()
  expect(wrap.find('h1').first()).toHaveText('Edit Invoice')

  // Change title
  invoice.title = "edited title"
  setField(wrap, 'title', invoice.title)

  // Remove first line item
  wrap.find('.btn-delete-item').first().simulate('click')
  invoice.total = 1.21

  // Submit & verify
  wrap.find('#form').first().simulate('submit')
  invoice.items.splice(0, 1)
  expect(handleEditInvoice.mock.calls).toEqual([[invoice]])
})
