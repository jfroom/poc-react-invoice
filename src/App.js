import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import './App.css';

// HEADER
function Header() {
  return (
    <Navbar bsStyle='inverse'>
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Invoice POC</a>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="https://github.com/jfroom/poc-react-invoice"><small>Source</small></a>
          </li>
        </ul>
      </div>
    </Navbar>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p>content here</p>
      </div>
    );
  }
}

export default App;
