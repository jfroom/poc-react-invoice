import { connect } from 'react-redux'
import InvoiceList from '../components/InvoiceList'
import * as actions from '../actions'

const mapStateToProps = (state) => ({
  invoices: state.invoices.invoices
})

const mapDispatchToProps = (dispatch) => ({
  handleDeleteInvoice: (id) => {
    dispatch(actions.deleteInvoice(id))
  }
})

const InvoiceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceList)

export default InvoiceListContainer
