// @flow
import React from 'react'
import { Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => (
  <Navbar bsStyle="inverse">
    <div className="navbar-header">
      <LinkContainer to="/" className="navbar-brand">
        <a>Invoice POC</a>
      </LinkContainer>
    </div>
    <ul className="nav navbar-nav navbar-right">
      <li>
        <a href="https://github.com/jfroom/poc-react-invoice"><small>Source</small></a>
      </li>
    </ul>
  </Navbar>
)

export default Header
