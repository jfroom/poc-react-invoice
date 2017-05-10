import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './Header'
import Breadcrumb from './Breadcrumb'
import InvoicePage from './InvoicePage'
import InvoiceFormPage from './InvoiceFormPage'
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className='App container text-left'>
            <Breadcrumb/>
            <Route exact path="/" component={InvoicePage} />
            <Route path="/new" component={InvoiceFormPage} />
            <Route path="/edit" component={InvoiceFormPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
