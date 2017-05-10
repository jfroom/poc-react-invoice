import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

const Breadcrumb = () => (
  <div>
    <ol className="breadcrumb">
      <li><LinkContainer to='/'><a>Invoices</a></LinkContainer></li>
      <li><LinkContainer to='/new'><a>New Invoice</a></LinkContainer></li>
    </ol>
  </div>
)

export default Breadcrumb
