import React, { Component } from 'react';
import "./navbar.css";
import Cookies from 'js-cookie';
import Search from "../searchbar/search";
import {Button, FormControl, Nav, Navbar} from 'react-bootstrap';
import ApiService from '../../services/apiservice';
import 'bootstrap/dist/css/bootstrap.css';


class Mynavbar extends Component {
    constructor() {
            super();
            this.state = {
                username: 'Sign in',
                link:'/Login',
                query: "",
                form: "",
                items:[]
            };
            this.change = this.change.bind(this)
        }
    
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    
    componentWillMount() {
        if (Cookies.get('username')) {
                this.state.username = Cookies.get('username');
                this.state.link = '/editUser';
          }
    }

    change(){
      let path = "/fandom/" + this.state.query;
      this.props.history.push(path);
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
                    <Nav.Link href={this.state.link}>{this.state.username}</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
                {/* <FormControl className="mr-sm-2" type="text"  placeholder="Search" onChange={this.onChange} name="query"/>
                <Button variant="outline-success" onClick={()=>{}} >Search</Button> */}
              </Navbar>
                );
    }
}
export default Mynavbar;