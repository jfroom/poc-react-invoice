import { handleActions } from 'redux-actions'
import * as actionTypes from './actionTypes'

const reducer = handleActions({
  [actionTypes.ADD_INVOICE]: (state, action) => {
    const id = state.nextId
    const invoice = Object.assign({}, action.payload, { id })
    const invoices = state.invoices.slice()
    invoices.push(invoice)
    return { ...state, invoices, nextId: id + 1 }
  },
  [actionTypes.EDIT_INVOICE]: (state, action) => {
    const invoices =
      state.invoices.map(invoice => (invoice.id === action.payload.id ? action.payload : invoice))
    return { ...state, invoices }
  },
  [actionTypes.DELETE_INVOICE]: (state, action) => {
    const invoices = state.invoices.filter(invoice => invoice.id !== action.payload)
    return { ...state, invoices }
  },
  [actionTypes.CHANGE_STATUS_FILTER]: (state, action) => (
    { ...state, statusFilter: action.payload }
  ),
}, {})

export default reducer
