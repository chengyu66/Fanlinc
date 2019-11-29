import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';
import {Button, Input} from "@material-ui/core";
import {Form} from 'react-bootstrap';
import "./login.css"
import Cookies from 'js-cookie';

class login extends Component{
    constructor(){
        super();
        this.state = {
         password: '',
         email: '',
         loading:true
        };
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
            if (Cookies.get('username')) {
                const location = {
                    pathname: '/'
                };
                this.props.history.push(location);
            } else {
                const location = {
                    pathname: '/Login'
                };
                this.props.history.push(location);
            }

     }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    getUser = (e) => {
         e.preventDefault();
         let user = {password: this.state.password, email: this.state.email};
         console.log(user);
         console.log("Hello in log in");
         ApiService.login(user)
         .then(res => {
                console.log("Success");
                let data = res.data;
                if (data){
                    this.state.email = data.email;
                    this.state.password = data.password;
                    this.state.loading = false;
                    Cookies.set('id', data.id);
                    Cookies.set('username', data.firstName);
                    Cookies.set('email', data.email);
                    window.location.reload();
                    this.props.history.push('/');
                }
                else{
                    alert("The Email and password are incorrect");
                }
            })
            .catch(error => {
                console.log("Fail");
            });
    };

    goToSignUp = () => {
        this.props.history.push(`/signup`);
    };

    render() {
        return (
            <Form className="form">
                <h2>Sign in</h2>
                {/* <Form className="form"> */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="123@email.com" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </Form.Group>
                    <div className="button-div">
                        <Button className="Login" onClick={this.getUser}>Log in</Button>
                        <Button className="Signup" onClick={this.goToSignUp}>Sign up</Button>
                    </div>
                {/* </Form> */}
            </Form>
        );
    }
}

export default login;