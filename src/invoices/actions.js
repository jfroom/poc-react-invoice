let nextInvoiceId = 0
import ACTION_TYPES from './actionTypes.js'

const createInvoice = (title, status, items) => ({
  type: ACTION_TYPES.ADD_INVOICE,
  id: nextInvoiceId++,
  title,
  status,
  items
})

const updateInvoice = (id, title, status, items) => ({
  type: ACTION_TYPES.UPDATE_INVOICE,
  id,
  title,
  status,
  items
})

const deleteInvoice = (id) => ({
  type: ACTION_TYPES.DELETE_INVOICE,
  id
})

const emailInvoice = (id) => ({
  type: ACTION_TYPES.EMAIL_INVOICE,
  id
})

export {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  emailInvoice
}
