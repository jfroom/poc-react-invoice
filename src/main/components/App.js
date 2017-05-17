// @flow
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import Header from './Header'
import {
  Breadcrumb,
  InvoiceFormContainer,
  InvoiceListContainer,
} from '../../invoices'
import '../index.css'
import '../../invoices/index.css'

const App = () => {
  const BreadcrumbWithRouter:Router = withRouter(Breadcrumb)

  // For GitHub Pages (prod), assign basename
  let basename = ''
  if (/https?:\/\/.+github\.io/.test(window.location.origin)) {
    basename = window.location.pathname.split('/')[1]
  }
  return (
    <Router basename={basename}>
      <div>
        <Header />
        <div className="App container text-left">
          <BreadcrumbWithRouter />
          <Route exact path="/" component={InvoiceListContainer} />
          <Route path="/new" component={InvoiceFormContainer} />
          <Route path="/edit" component={InvoiceFormContainer} />
        </div>
      </div>
    </Router>
  )
}
export default App
