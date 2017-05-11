import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducer'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css'

let store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
