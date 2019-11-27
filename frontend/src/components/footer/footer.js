import React, { Component } from 'react';
import {Card, Navbar, NavbarBrand, Container} from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
        <div>
            <Navbar>
                <Container>
                    <p><NavbarBrand>Fanlinc</NavbarBrand>, Copyright &copy; 2019</p>
                </Container>
            </Navbar>
        </div>
    );
  }
}

export default Footer;