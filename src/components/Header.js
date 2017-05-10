import React from 'react'
import {Navbar} from 'react-bootstrap'

const Header = () => {
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
export default Header
