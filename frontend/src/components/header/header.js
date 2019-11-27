import React, { Component } from 'react';
import Mynavbar from "../navbar/navbar";
// import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {

  render() {
    return (
        <header>
            <Mynavbar />
        </header>
    );
  }
}

export default Header;