import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
        <Card.Footer>
          <p align="center">Fanlinc, Copyright &copy; 2019</p>
        </Card.Footer>
    );
  }
}

export default Footer;