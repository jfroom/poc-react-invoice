// @flow
import { handleActions } from 'redux-actions'
import { ActionTypes } from './actions'
import type { State } from './models'

type Action = {
  +type: string,
  +payload: Object,
}

const reducer = handleActions({
  [ActionTypes.ADD_INVOICE]: (state: State, action: Action) => {
    const id = state.nextId
    const invoice = Object.assign({}, action.payload, { id })
    const invoices = state.invoices.slice()
    invoices.push(invoice)
    return { ...state, invoices, nextId: id + 1 }
  },
  [ActionTypes.EDIT_INVOICE]: (state: State, action: Action) => {
    const invoices =
      state.invoices.map(invoice => (invoice.id === action.payload.id ? action.payload : invoice))
    return { ...state, invoices }
  },
  [ActionTypes.DELETE_INVOICE]: (state: State, action: Action) => {
    const invoices = state.invoices.filter(invoice => invoice.id !== action.payload)
    return { ...state, invoices }
  },
  [ActionTypes.CHANGE_STATUS_FILTER]: (state: State, action: Action) => (
    { ...state, statusFilter: action.payload }
  )
}, {})

export default reducer
