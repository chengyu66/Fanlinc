import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';

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
                let data = res.data
                this.state.email = data.email;
                this.state.password = data.password;
                this.state.status = true;
                let history = Redirect();
                history.push("/signup");
            })
            .catch(error => {
                console.log("Fail");
            });
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Log in</h2>
                <form>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>password:</label>
                        <input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <button className="Login" onClick={this.getUser}>Login</button>
                    <div>
                    <button className="Signup"><a href = "/home">Signup</a></button>
                    </div>
                </form>
            </div>
        );
    }
}

export default login;