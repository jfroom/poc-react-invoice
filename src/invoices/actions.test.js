import { actions, ActionTypes } from './actions'

let invoice = {id: -1, title: 'foo', status: 'Paid', total: 0, notes: 'moo', items: []}

it('addInvoice', () => {
  expect(actions.addInvoice(invoice))
    .toEqual({
      type: ActionTypes.ADD_INVOICE,
      payload: { ...invoice }
    })
})

it('editInvoice', () => {
  let invoice2 = {...invoice, title: 'foo2'}
  expect(actions.editInvoice(invoice2))
    .toEqual({
      type: ActionTypes.EDIT_INVOICE,
      payload: { ...invoice2 }
    })
})

it('deleteInvoice', () => {
  expect(actions.deleteInvoice(1))
    .toEqual({
      type: ActionTypes.DELETE_INVOICE,
      payload: 1
    })
})

it('changeStatusFilter', () => {
  expect(actions.changeStatusFilter('Unpaid'))
    .toEqual({
      type: ActionTypes.CHANGE_STATUS_FILTER,
      payload: 'Unpaid'
    })
})
