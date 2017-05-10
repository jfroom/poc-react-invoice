import React from 'react';
import {
  Button, Table, Glyphicon
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const InvoicePage = () => (
  <div>
    <h1>Invoices</h1>
    <hr/>

    <div className='col-sm-12 text-right'>
      <LinkContainer to="/new">
        <Button bsStyle='success' bsSize='large'><Glyphicon glyph='plus'/> New Invoice</Button>
      </LinkContainer>
    </div>
    <br/><br/><br/>

    <Table condensed hover className='invoice-list'>
      <thead>
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>Total</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Hoyt Residence Kitchen Remodel</td>
          <td>$25,000</td>
          <td>Paid</td>
          <td>
            <Button className='btn-xs btn-info'><Glyphicon glyph='search'/></Button>
            <Button className='btn-xs btn-success'><Glyphicon glyph='envelope'/></Button>
            <Button className='btn-xs btn-primary'><Glyphicon glyph='pencil'/></Button>
            <Button className='btn-xs btn-danger'><Glyphicon glyph='trash'/></Button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Alder Residence Bathroom Remodel</td>
          <td>$20,000</td>
          <td>Late</td>
          <td>
            <Button className='btn-xs btn-info'><Glyphicon glyph='search'/></Button>
            <Button className='btn-xs btn-success'><Glyphicon glyph='envelope'/></Button>
            <Button className='btn-xs btn-primary'><Glyphicon glyph='pencil'/></Button>
            <Button className='btn-xs btn-danger'><Glyphicon glyph='trash'/></Button>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
)
export default InvoicePage
