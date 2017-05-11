import { connect } from 'react-redux'
import InvoiceForm from '../components/InvoiceForm'

const deleteItem = (id) => {
  console.log("deleteItem " + id)
}
const addItem = (text, price) => {
  console.log("addItem " + text + ' price: ' + price)
}
const mapStateToProps = (state, ownProps) => {
  let props = {
    onClickDeleteItem: (id) => { deleteItem(id) },
    onClickAddItem: (id) => { addItem(id) }
  }
  const parts = ownProps.location.pathname.split('/')
  props.action = parts[1]
  if (props.action === 'edit') {
    const id = parseInt(parts[2], 10)
    props.invoice = state.invoices.find((invoice) => invoice.id === id)
  }
  return props
}

const mapDispatchToProps = {
  onItemDelete: deleteItem,
  onItemAdd: addItem
}

const InvoiceFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceForm)

export default InvoiceFormContainer
