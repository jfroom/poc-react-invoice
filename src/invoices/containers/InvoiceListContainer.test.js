import { mapStateToProps, mapDispatchToProps } from './InvoiceListContainer'
import initialState from '../../initialState'
import { StatusTypes } from '../constants'

const filterInvoices = (invoices, statusFilter) => {
  return invoices.filter(invoice => (invoice.status === statusFilter))
}
const sortInvoices = (invoices) => {
  return invoices.sort((a, b) => (new Date(a.date) - new Date(b.date)))
}

it('mapStateToProps', () => {

  // No filter
  let state = { ...initialState }
  let props = mapStateToProps(state, {})
  let sortedInvoices = sortInvoices(initialState.invoices.invoices)
  expect(props).toEqual({invoices: sortedInvoices, statusFilter: StatusTypes.NONE})

  // Status filter
  const invoices = initialState.invoices.invoices
  const newState = {invoices: { invoices, statusFilter: StatusTypes.PAID} }
  props = mapStateToProps(newState)
  const filteredInvoices = filterInvoices(invoices, StatusTypes.PAID)
  sortedInvoices = sortInvoices(filteredInvoices)
  expect(props).toEqual({invoices: sortedInvoices, statusFilter: props.statusFilter})
})

it('mapDispatchToProps', () => {
  let dispatch = jest.fn()
  let props = mapDispatchToProps(dispatch)
  let invoice = initialState.invoices.invoices[0]

  // Delete invoice
  props.handleDeleteInvoice(invoice.id)
  expect(dispatch.mock.calls.length).toBe(1)
  expect(dispatch.mock.calls[0][0]).toEqual(
    { type: 'DELETE_INVOICE', payload: invoice.id }
  )

  // Change status filter
  props.handleChangeStatusFilter(StatusTypes.PAID)
  expect(dispatch.mock.calls.length).toBe(2)
  expect(dispatch.mock.calls[1][0]).toEqual(
    { type: 'CHANGE_STATUS_FILTER', payload: StatusTypes.PAID }
  )
})
