import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'

const Breadcrumb = ({ location }) => {
  const items = [{ text: 'Invoices', to: '/', active: true }]
  if (location.pathname !== '/') {
    const action = location.pathname.split('/')[1]
    items.push({ text: `${action} Invoice` })
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
        {items.map((item, idx) => (<li key={idx}>{getInner(item)}</li>))}
      </ol>
    </div>
  )
}

Breadcrumb.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
}
Breadcrumb.defaultProps = {
  location: {
    pathname: '',
  },
}

export default Breadcrumb
