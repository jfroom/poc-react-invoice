import { connect } from 'react-redux'
import InvoiceForm from '../components/InvoiceForm'
import * as actions from '../actions'

const mapStateToProps = (state, ownProps) => {
  const props = { invoice: null }
  const pathParts = ownProps.location.pathname.split('/')
  if (pathParts[1] === 'edit') {
    const id = parseInt(pathParts[2], 10)
    props.invoice = state.invoices.invoices.find(invoice => invoice.id === id)
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleAddInvoice: (invoice) => {
    dispatch(actions.addInvoice(invoice))
    ownProps.history.push('/')
  },
  handleEditInvoice: (invoice) => {
    dispatch(actions.editInvoice(invoice))
    ownProps.history.push('/')
  },
})

const InvoiceFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceForm)

export default InvoiceFormContainer
