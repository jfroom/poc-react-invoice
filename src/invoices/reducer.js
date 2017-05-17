// @flow
import { handleActions } from 'redux-actions'
import { ActionTypes } from './actions'
import type { State, Invoice } from './models'

type Action = {
  +type: string,
  +payload: Object,
}

const reducer = handleActions({
  [ActionTypes.ADD_INVOICE]: (state: State, action: Action) => {
    const id:number = state.nextId
    const invoice:Invoice = Object.assign({}, action.payload, { id })
    const invoices:Array<Invoice> = state.invoices.slice()
    invoices.push(invoice)
    return { ...state, invoices, nextId: id + 1 }
  },
  [ActionTypes.EDIT_INVOICE]: (state: State, action: Action) => {
    const invoices:Array<Invoice> =
      state.invoices.map(invoice => (invoice.id === action.payload.id ? action.payload : invoice))
    return { ...state, invoices }
  },
  [ActionTypes.DELETE_INVOICE]: (state: State, action: Action) => {
    const invoices:Array<Invoice> = state.invoices.filter(invoice => invoice.id !== action.payload)
    return { ...state, invoices }
  },
  [ActionTypes.CHANGE_STATUS_FILTER]: (state: State, action: Action) => {
    return { ...state, statusFilter: action.payload }
  }
}, {})

export default reducer
