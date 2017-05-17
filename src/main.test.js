import React from 'react'
import App from './main/components/App'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './main/reducer'
import initialState from './initialState'
import { actions } from './invoices/actions'

let wrap
let store

beforeEach(() => {
  store = createStore(rootReducer, initialState)
  wrap = shallow(<Provider store={store}><App/></Provider>)
})

it('renders without crashing', () => {
  expect(toJson(wrap)).toMatchSnapshot()
})

it('should dispatch & reduce an action', () => {
  store.dispatch(actions.deleteInvoice(1))
  const len = initialState.invoices.invoices.length
  expect(store.getState().invoices.invoices.length).toBe(len - 1)
})
