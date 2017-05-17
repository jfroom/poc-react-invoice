// @flow
import { connect } from 'react-redux'
import InvoiceForm from '../components/InvoiceForm'
import { actions } from '../actions'
import type { State as MainState } from '../../main/models'
import type { State as InvoiceState } from '../models'
import type { Invoice, History, Location } from '../models'

type Props = {
  invoice: Invoice,
  handleAddInvoice: Function,
  handleEditInvoice: Function,
  location: Location,
  history: History
}

export const mapStateToProps = (mainState: MainState, ownProps: Props) => {
  const props = {}
  const state:InvoiceState = mainState.invoices
  const pathParts = ownProps.location.pathname.split('/')
  if (pathParts[1] === 'edit') {
    const id = parseInt(pathParts[2], 10)
    props.invoice = state.invoices.find(invoice => invoice.id === id)
  }
  return props
}

export const mapDispatchToProps = (dispatch: Function, ownProps: Props) => ({
  handleAddInvoice: (invoice: Invoice) => {
    dispatch(actions.addInvoice(invoice))
    ownProps.history.push('/')
  },
  handleEditInvoice: (invoice: Invoice) => {
    dispatch(actions.editInvoice(invoice))
    ownProps.history.push('/')
  },
})

const InvoiceFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceForm)

export default InvoiceFormContainer
