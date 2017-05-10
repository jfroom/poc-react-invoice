import React, { Component } from 'react';
import {
  Navbar, Breadcrumb, Button, Table, FormGroup, ControlLabel, FormControl, Glyphicon
} from 'react-bootstrap';
import './App.css';

// HEADER
function Header() {
  return (
    <Navbar bsStyle='inverse'>
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Invoice POC</a>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="https://github.com/jfroom/poc-react-invoice"><small>Source</small></a>
          </li>
        </ul>
    </Navbar>
  );
}

// APP
class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className='App container text-left'>
          <Breadcrumb>
            <Breadcrumb.Item active>Invoices</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Invoices</h1>
          <hr/>

          <div className='col-sm-12 text-right'>
            <Button bsStyle='success' bsSize='large'><Glyphicon glyph='plus'/> New Invoice</Button>
          </div>
          <br/><br/>

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

        <hr/>

        <div className='container text-left'>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Invoices</Breadcrumb.Item>
            <Breadcrumb.Item active>New Invoice</Breadcrumb.Item>
          </Breadcrumb>
          <h1>New Invoice</h1>
          <hr/>
          <form>
            <FormGroup controlId='title' validationState={null}>
              <ControlLabel>Title</ControlLabel>
              <FormControl type='text' value='' placeholder='Enter title'/>
              <FormControl.Feedback/>
            </FormGroup>
            <div className='row'>
              <div className='col-sm-6'>
                <FormGroup controlId='number' validationState={null}>
                  <ControlLabel>Invoice #</ControlLabel>
                  <FormControl type='text' value='' placeholder='Enter number'/>
                  <FormControl.Feedback/>
                </FormGroup>
              </div>
              <div className='col-sm-6'>
                <FormGroup controlId='status' validationState={null}>
                  <ControlLabel>Status</ControlLabel>
                  <FormControl componentClass="select" placeholder="Status">
                    <option value="due">Due</option>
                    <option value="overdue">Overdue</option>
                    <option value="paid">Paid</option>
                  </FormControl>
                </FormGroup>
              </div>
            </div>

            <FormGroup controlId='newLineItem' validationState={null}>
              <ControlLabel>Line Items</ControlLabel>
              <Table condensed striped className='line-items'>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Cost</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Desc 1</td>
                    <td>$5,000</td>
                    <td>
                      <Button className='btn-xs btn-primary'><Glyphicon glyph='pencil'/></Button>
                      <Button className='btn-xs btn-danger'><Glyphicon glyph='trash'/></Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Desc 2</td>
                    <td>$9,000</td>
                    <td>
                      <Button className='btn-xs btn-primary'><Glyphicon glyph='pencil'/></Button>
                      <Button className='btn-xs btn-danger'><Glyphicon glyph='trash'/></Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroup controlId={'desc-0'} validationState={null}>
                        <FormControl type='text' value='' placeholder="Enter description"/>
                        <FormControl.Feedback/>
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup controlId={'cost-0'} validationState={null}>
                        <FormControl type='text' value='' placeholder="Enter cost"/>
                        <FormControl.Feedback/>
                      </FormGroup>
                    </td>
                    <td>
                      <Button className='btn-xs btn-success'><Glyphicon glyph='plus'/> Add</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </FormGroup>

            <FormGroup controlId='total' validationState={null}>
              <ControlLabel>Total Due</ControlLabel>
              <FormControl.Static>$11,000</FormControl.Static>
              <FormControl.Feedback/>
            </FormGroup>

            <FormGroup controlId='notes' validationState={null}>
              <ControlLabel>Notes</ControlLabel>
              <FormControl componentClass='textArea' value='' placeholder='Enter notes'/>
              <FormControl.Feedback/>
            </FormGroup>

            <div className='text-right'>
              <Button type="submit" className='btn-default btn-lg'>Cancel</Button>&nbsp;
              <Button type="submit" className='btn-success btn-lg'>Save</Button>
            </div>
          </form>
        </div>
        <p/>
      </div>


    );
  }
}

export default App;
