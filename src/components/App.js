import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { withRouter } from 'react-router'

import Header from './Header'
import Breadcrumb from './Breadcrumb'
import InvoiceListContainer from '../containers/InvoiceListContainer'
import InvoiceFormContainer from '../containers/InvoiceFormContainer'
import '../styles/App.css';

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
