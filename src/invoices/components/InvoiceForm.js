import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  Button, Table, FormGroup, ControlLabel, FormControl, Glyphicon
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import NumberFormat from 'react-number-format'

class InvoiceForm extends Component {
  render() {
    const invoiceEmpty = {title: '', status: '', total: 0, items: []}
    const invoice = this.props.invoice ? this.props.invoice : invoiceEmpty

    const renderItems = () => {
      return (
        invoice.items.map((item, idx) =>
          <tr key={idx}>
            <td>{item.text}</td>
            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} decimalPrecision={true} prefix={'$'} /></td>
            <td>
              <Button className='btn-xs btn-danger'><Glyphicon glyph='trash'/></Button>
            </td>
          </tr>
        )
      )
    }

    return (
      <div className="InvoiceForm">
        <h1>{this.props.action} Invoice</h1>
        <hr/>
        <form>
          <div className='row'>
            <div className='col-sm-10'>
              <FormGroup controlId='title' validationState={null}>
                <ControlLabel>Title</ControlLabel>
                <FormControl type='text' value={invoice.title} placeholder='Enter title' onChange={() => {}}/>
                <FormControl.Feedback/>
              </FormGroup>
            </div>
            <div className='col-sm-2'>
              <FormGroup controlId='status' validationState={null}>
                <ControlLabel>Status</ControlLabel>
                <FormControl componentClass="select" placeholder="Status" value={invoice.status} onChange={() => {}}>
                  <option value="due">Due</option>
                  <option value="overdue">Overdue</option>
                  <option value="paid">Paid</option>
                </FormControl>
              </FormGroup>
            </div>
          </div>


          <FormGroup controlId='line-items' validationState={null}>
            <ControlLabel>Line Items</ControlLabel>
            <div className='well'>
              <Table condensed className='line-items'>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {renderItems()}
                  <tr>
                    <td>
                      <FormGroup controlId={'text-0'} validationState={null}>
                        <FormControl type='text' value='' placeholder="Enter line item"/>
                        <FormControl.Feedback/>
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup controlId={'cost-0'} validationState={null}>
                        <FormControl type='text' value='' placeholder="Enter price"/>
                        <FormControl.Feedback/>
                      </FormGroup>
                    </td>
                    <td>
                      <Button className='btn-xs btn-success'><Glyphicon glyph='plus'/> Add</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              </div>
            </FormGroup>

          <FormGroup controlId='total' validationState={null}>
            <ControlLabel>Total Due</ControlLabel>
            <FormControl.Static>
              <NumberFormat value={invoice.total} displayType={'text'} thousandSeparator={true} decimalPrecision={true} prefix={'$'} />
            </FormControl.Static>
            <FormControl.Feedback/>
          </FormGroup>

          <FormGroup controlId='notes' validationState={null}>
            <ControlLabel>Notes</ControlLabel>
            <FormControl componentClass='textArea' value={invoice.notes} placeholder='Enter notes' onChange={() => {}}/>
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
  }
}

InvoiceForm.propTypes = {
  invoice: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired).isRequired,
    notes: PropTypes.text
  }).isRequired
}
export default InvoiceForm
