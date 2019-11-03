import React, { Component } from 'react';
import Navbar from "../navbar/navbar";
import Search from "../searchbar/search";
import './header.css';

class Header extends Component {

  render() {
    return (
        <div>
                  <Navbar />
                  <Search />
        </div>
    );
  }
}

export default Header;