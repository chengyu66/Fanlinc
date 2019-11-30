import React, { Component } from 'react';
import "./navbar.css";
import Cookies from 'js-cookie';
import Search from "../searchbar/search";
import {Form, Button, FormControl, Nav, Navbar} from 'react-bootstrap';
import ApiService from '../../services/apiservice';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router-dom'


class Mynavbar extends Component {
    constructor() {
            super();
            this.state = {
                username: 'Sign in',
                link:'/Login',
                query: "Default",
                form: "",
                items:[]
            };
            this.search = this.search.bind(this)
        }
    
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    
    componentDidMount() {
        if (Cookies.get('email')) {
                this.setState({
                  username: Cookies.get('username'),
                  link: '/user/'+Cookies.get('email')
                })
          }
        else{
          this.setState({
            username: 'Sign in',
            link:'/Login',
          })
        }
    }

    search = () => {
      
      let path = "/search/" + this.state.query;
      this.props.history.push(path);
      // this.props.history.push(path);
    }

    render() {
        return (
              <Navbar className="bar" fixed = "top" expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className="logo" href="/">Fanlinc</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about" className="current">About</Nav.Link>
                    <Nav.Link href="/fandom/create">Fandoms</Nav.Link>
                    <Nav.Link href={this.state.link}>{this.state.username}</Nav.Link>
                  </Nav>

                  {/* <Form inline> */}
                    <FormControl type="text" placeholder="Search" className="search" onChange={this.onChange} name="query"/>
                    <Button  variant="outline-info" href={"/search/" + this.state.query} >Search</Button>
                  {/* </Form> */}
                  </Navbar.Collapse>
              </Navbar>
                );
    }
}
export default Mynavbar;