import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

class Breadcrumb extends Component {
  render() {
    let items = [{ text: 'Invoices', to: '/', active: true }]
    if (this.props.location.pathname !== '/') {
      const action = this.props.location.pathname.split('/')[1]
      items.push({text: action + ' Invoice'})
    }
    items[items.length - 1].active = false

    const getInner = (link) => {
      if (link.active) {
        return (
          <LinkContainer to={link.to} isActive={() => link.active}>
            <a>{link.text}</a>
          </LinkContainer>
        )
      }
      return <span>{link.text}</span>
    }

    return (
      <div>
        <ol className="breadcrumb">
          {items.map((item, idx) =>
              <li key={idx}>
                {getInner(item)}
              </li>
            )}
        </ol>
      </div>
    )
  }
}
export default Breadcrumb
