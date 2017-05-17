// @flow
export type InvoiceItem = {
  text: string,
  price: number,
}
export type Invoice = {
  id: number,
  title: string,
  date: string,
  status: string,
  total: number,
  notes: string,
  items: Array<InvoiceItem>,
}
export type Location = {
  pathname: string
}
export type History = {
  location: Location,
  push: Function
}
export type State = {
  +nextId: number,
  +invoices: Array<Invoice>
}
