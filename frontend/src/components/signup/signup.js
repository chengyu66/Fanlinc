import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Button, Input } from "@material-ui/core";
import "./signup.css"

class signup extends Component{

    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            status:false
        };
        this.addUser = this.addUser.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    addUser = (e) => {
        e.preventDefault();
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            description: ''
        };
        console.log(user);
        ApiService.signup(user)
            .then(res => {
                console.log("Success");
                let data = res.data;
                console.log(data.id);
                this.setState({status: true});
                alert("Sign Success!");
                this.goToLogin()
            })
            .catch(error => {
                console.log("Fail");
            });
    };

    goToLogin = () => {
        this.props.history.push(`/login`);
    };

    render() {
        return (
            <div>
                <form className="form">
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <label className="form-label">First Name:</label>
                        <Input type="text" placeholder="first name" name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Last Name:</label>
                        <Input type="text" placeholder="last name" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <Input type="email" placeholder="123@email.com" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">password:</label>
                        <Input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <div className="button-div">
                        <Button className="Signup" onClick={this.addUser}>Sign up</Button>
                        <Button className="Login" onClick={this.goToLogin}>Log in</Button>
                    </div>
                </form>
            </div>
        );
    };
}

export default signup;