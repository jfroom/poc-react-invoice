let nextInvoiceId = 0

export const createInvoice = (title, status, items) => ({
  type: ACTION_TYPES.ADD_INVOICE,
  id: nextInvoiceId++,
  title,
  status,
  items
})

export const updateInvoice = (id, title, status, items) => ({
  type: ACTION_TYPES.UPDATE_INVOICE,
  id,
  title,
  status,
  items
})

export const deleteInvoice = (id) => ({
  type: ACTION_TYPES.DELETE_INVOICE,
  id
})

export const emailInvoice = (id) => ({
  type: ACTION_TYPES.EMAIL_INVOICE,
  id
})
