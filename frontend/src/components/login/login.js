import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';

class login extends Component{
    constructor(){
        super();
        this.state = {
         password: '',
         email: '',
        };
        this.saveUser = this.saveUser.bind(this);
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
         e.preventDefault();
         let user = {password: this.state.password, email: this.state.email};
         console.log("Hello");
         ApiService.login(user)
             .then(res => {
                 return <Redirect to='/editUser' />
//                 this.setState({message : 'User add successfully.'});
                 //this.props.history.push('/users');
             });
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Edit Profile</h2>
                <form>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>password:</label>
                        <input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <button className="Long in" onClick={this.saveUser}>Login</button>
                </form>
            </div>
        );
    }
}

export default login;