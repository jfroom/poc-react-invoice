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
import styled from 'styled-components'

const StyleWrap = styled.div`
  font-family: 'Open Sans', Arial, sans-serif;
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto Slab', serif;
  }
`

const App = () => {
  const BreadcrumbWithRouter:Router = withRouter(Breadcrumb)

  // For GitHub Pages (prod), assign basename
  let basename = ''
  if (/https?:\/\/.+github\.io/.test(window.location.origin)) {
    basename = '/' + window.location.pathname.split('/')[1]
  }
  return (
    <Router basename={basename}>
      <StyleWrap>
        <Header />
        <div className="App container text-left">
          <BreadcrumbWithRouter />
          <Route exact path="/" component={InvoiceListContainer} />
          <Route path="/new" component={InvoiceFormContainer} />
          <Route path="/edit" component={InvoiceFormContainer} />
        </div>
      </StyleWrap>
    </Router>
  )
}
export default App
