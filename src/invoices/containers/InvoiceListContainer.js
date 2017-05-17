// @flow
import { connect } from 'react-redux'
import InvoiceList from '../components/InvoiceList'
import { actions } from '../actions'
import { StatusTypes } from '../constants'
import type { State as MainState } from '../../main/models'
import type { State as InvoiceState } from '../models'

export const mapStateToProps = (mainState: MainState) => {
  const state:InvoiceState = mainState.invoices
  const props = {
    invoices: state.invoices.slice(),
    statusFilter: state.statusFilter || StatusTypes.NONE,
  }
  // Filter status
  if (props.statusFilter !== StatusTypes.NONE) {
    props.invoices = props.invoices.filter(invoice => (invoice.status === props.statusFilter))
  }
  // Sort date
  props.invoices = props.invoices.sort((a, b) => (new Date(a.date) - new Date(b.date)))
  return props
}

export const mapDispatchToProps = (dispatch: Function) => ({
  handleDeleteInvoice: (id: number) => {
    dispatch(actions.deleteInvoice(id))
  },
  handleChangeStatusFilter: (status: string) => {
    dispatch(actions.changeStatusFilter(status))
  },
})

const InvoiceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceList)

export default InvoiceListContainer
