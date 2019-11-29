import React, { Component } from 'react';
import {Card, Navbar, NavbarBrand, Container} from 'react-bootstrap';
import ScrollUpButton from "react-scroll-up-button";

class Footer extends Component {
  render() {
    return (
        <Card.Footer>
          <div>
            <p align="center">Fanlinc, Copyright &copy; 2019</p>
          </div>
          <div>
            <ScrollUpButton />
          </div>
        </Card.Footer>
    );
  }
}

export default Footer;