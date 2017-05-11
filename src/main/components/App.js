import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { withRouter } from 'react-router'

import Header from './Header'
import {
  Breadcrumb,
  InvoiceFormContainer,
  InvoiceListContainer
} from '../../invoices'

import '../index.css';
import '../../invoices/index.css';

class App extends Component {
  render() {
    const BreadcrumbWithRouter = withRouter(Breadcrumb)
    return (
      <Router>
        <div>
          <Header />
          <div className='App container text-left'>
              <BreadcrumbWithRouter/>
              <Route exact path="/" component={InvoiceListContainer} />
              <Route path="/new" component={InvoiceFormContainer} />
              <Route path="/edit" component={InvoiceFormContainer} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
