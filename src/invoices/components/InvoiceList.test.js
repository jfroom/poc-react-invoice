import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import InvoiceList from './InvoiceList'
import initialState from '../../initialState'
import { StatusTypes } from '../constants'

let props = {}
let handleDeleteInvoice
let handleChangeStatusFilter

beforeEach( () => {
  handleDeleteInvoice = jest.fn()
  handleChangeStatusFilter = jest.fn()
  props = { handleDeleteInvoice, handleChangeStatusFilter}
})

it('empty', () => {
  const wrap = shallow(<InvoiceList {...props} />)
  expect(toJson(wrap)).toMatchSnapshot()

  // Empty table
  expect(wrap.find('.invoice-list tbody tr')).toHaveLength(0)
})

it('full list with delete & status filter mocks', () => {
  props.invoices = initialState.invoices.invoices

  const wrap = shallow(<InvoiceList {...props} />)
  expect(toJson(wrap)).toMatchSnapshot()

  // Populated table
  expect(wrap.find('.invoice-list tbody tr')).toHaveLength(3)

  // Delete callback
  wrap.find(".invoice-list tbody tr .btn-delete").at(0).simulate('click')
  expect(handleDeleteInvoice.mock.calls).toEqual([[1]])

  // Change filter
  wrap.find("#status-filter").first().simulate('change', {target: {value: StatusTypes.Paid}})
  expect(handleChangeStatusFilter.mock.calls).toEqual([[StatusTypes.Paid]])
})
