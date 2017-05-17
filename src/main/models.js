// @flow
import type { State as InvoicesState } from '../invoices/models'

export type State = {
  +invoices: InvoicesState
}
