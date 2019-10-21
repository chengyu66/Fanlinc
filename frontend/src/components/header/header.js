import React, { Component } from 'react';
import Navbar from "../navbar/navbar";

class Header extends Component {

  render() {
    return (
        <div className="primary" id="Header">
        <Navbar />
      </div>
    );
  }
}

export default Header;