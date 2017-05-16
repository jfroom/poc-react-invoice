// @flow
import { createActions } from 'redux-actions'

export const ActionTypes = {
  ADD_INVOICE: 'ADD_INVOICE',
  EDIT_INVOICE: 'EDIT_INVOICE',
  DELETE_INVOICE: 'DELETE_INVOICE',
  CHANGE_STATUS_FILTER: 'CHANGE_STATUS_FILTER',
}

export const { addInvoice, editInvoice, deleteInvoice, changeStatusFilter } =
  createActions({
    [ActionTypes.ADD_INVOICE]: invoice => (invoice),
    [ActionTypes.EDIT_INVOICE]: invoice => (invoice),
  }, ActionTypes.DELETE_INVOICE, ActionTypes.CHANGE_STATUS_FILTER)
