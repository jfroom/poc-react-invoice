import React from 'react';
import {
  Button, Table, FormGroup, ControlLabel, FormControl, Glyphicon
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const InvoiceFormPage = () => (
  <div>
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
        <LinkContainer to="/" className='btn-default btn-lg' exact>
          <Button>Cancel</Button>
        </LinkContainer>
        <Button type="submit" className='btn-success btn-lg'>Save</Button>
      </div>
    </form>
    <p/>
  </div>
)

export default InvoiceFormPage
