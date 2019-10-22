import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';
import {Button, Input } from "@material-ui/core";
import "./login.css"

class login extends Component{
    constructor(){
        super();
        this.state = {
         password: '',
         email: '',
         status:false
        };
        this.getUser = this.getUser.bind(this);
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
                this.state.email = data.email;
                this.state.password = data.password;
                this.state.status = true;
                let history = Redirect();
                history.push("/signup");
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
            <div>
                <h2>Log in</h2>
                <form>
                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <Input type="email" placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">password:</label>
                        <Input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <div className="button-div">
                        <Button className="Login" onClick={this.getUser}>Log in</Button>
                        <Button className="Signup" onClick={this.goToSignUp}>Sign up</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default login;