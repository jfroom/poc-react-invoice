import { connect } from 'react-redux'
import InvoiceList from '../components/InvoiceList'
import * as actions from '../actions'

const mapStateToProps = (state) => {
  const props = {
    invoices: state.invoices.invoices.slice(),
    statusFilter: state.invoices.statusFilter,
  }
  // Filter status
  if (props.statusFilter && props.statusFilter !== '') {
    props.invoices = props.invoices.filter(invoice => (invoice.status === props.statusFilter))
  }
  // Sort date
  props.invoices = props.invoices.sort((a, b) => (new Date(a.date) - new Date(b.date)))
  return props
}

const mapDispatchToProps = dispatch => ({
  handleDeleteInvoice: (id) => {
    dispatch(actions.deleteInvoice(id))
  },
  handleChangeStatusFilter: (status) => {
    dispatch(actions.changeStatusFilter(status))
  },
})

const InvoiceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceList)

export default InvoiceListContainer
