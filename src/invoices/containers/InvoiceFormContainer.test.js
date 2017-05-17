import { mapStateToProps, mapDispatchToProps } from './InvoiceFormContainer'
import initialState from '../../initialState'

it('mapStateToProps', () => {
  let state = { ...initialState }
  let ownProps = { location: { pathname: '/' } }

  // New invoice
  let props = mapStateToProps(state, ownProps)
  expect(props).toEqual({})

  // Edit invoice
  ownProps = { location: { pathname: '/edit/1' } }
  props = mapStateToProps(state, ownProps)
  expect(props).toEqual({ invoice: state.invoices.invoices[0] })
})

it('mapDispatchToProps', () => {
  let dispatch = jest.fn()
  let ownProps = { history: { push: jest.fn() } }
  let props = mapDispatchToProps(dispatch, ownProps)
  let invoice = initialState.invoices.invoices[0]

  // Add invoice
  props.handleAddInvoice(invoice)
  expect(dispatch.mock.calls.length).toBe(1)
  expect(dispatch.mock.calls[0][0]).toEqual(
    { type: 'ADD_INVOICE', payload: { ...invoice } }
  )
  expect(ownProps.history.push.mock.calls).toEqual([ [ '/' ] ])

  // Edit invoice
  let invoice2 = { ...invoice, title: 'title2'}
  props.handleEditInvoice(invoice2)
  expect(ownProps.history.push.mock.calls).toEqual([ [ '/' ], [ '/' ] ])
  expect(dispatch.mock.calls.length).toBe(2)
  expect(dispatch.mock.calls[1][0]).toEqual(
    { type: 'EDIT_INVOICE', payload: { ...invoice2 } }
  )
})
