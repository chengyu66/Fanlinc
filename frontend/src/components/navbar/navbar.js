import React, { Component } from 'react';
import "./navbar.css";
import Cookies from 'js-cookie';
import Search from "../searchbar/search";
import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Mynavbar extends Component {
    constructor() {
            super();
            this.state = {
                username: 'Sign in',
                link:'/Login'
            };
        }

    look() {
        if (Cookies.get('username')) {
                this.state.username = Cookies.get('username');
                this.state.link = '/editUser';
          }
    }

    render() {
        return (
              <Navbar expand="lg">
                <Navbar.Brand href="/"><span className="highlight">Fan</span>linx</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#" className="current">About</Nav.Link>
                    <Nav.Link href="#">Fandoms</Nav.Link>
                    <Nav.Link href={this.state.link} onClick={this.look()}>{this.state.username}</Nav.Link>
                  </Nav>
                  <Search id = 'nav-search' />
                </Navbar.Collapse>
              </Navbar>
                );
    }
}
export default Mynavbar;