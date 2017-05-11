import { connect } from 'react-redux'
import InvoiceList from '../components/InvoiceList'

const deleteInvoice = (id) => {
  console.log("deleteInvoice " + id)
}

const mapStateToProps = (state) => ({
  invoices: state.invoices,
  onClickDelete: (id) => { deleteInvoice(id) }
})

const mapDispatchToProps = {
  onInvoiceDelete: deleteInvoice
}

const InvoiceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceList)

export default InvoiceListContainer
