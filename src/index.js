import 'bootstrap/dist/css/bootstrap.css'

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './main/components/App'
import rootReducer from './main/reducer'
import initialState from './initialState'

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
