import React, { Component } from 'react';
//import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';

class edidUser extends Component{
    constructor(){
        super();
        this.state = {
         username: '',
         password: '',
         email: '',
         age: ''
        };
        this.loadUser = this.loadUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    // componentDidMount() {
    //     this.loadUser();
    // }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    loadUser() {
        ApiService.getUser('email')
            .then((res) => {
                let user = res.data.result;
                this.setState({
                username: user.username,
                password: user.password,
                age: user.age,
                salary: user.salary,
                })
            });
    }

    saveUser = (e) => {
         e.preventDefault();
         let user = {username: user.username, password: this.state.password, age: this.state.age, email: this.state.email};
         ApiService.setUser(user)
             .then(res => {
                 this.setState({message : 'User edit successfully.'});
                 this.props.history.push('/users');
             });
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Edit Profile</h2>
                <form>

                    <div className="form-group">
                        <label>UserName:</label>
                        <input type="text" placeholder="username" name="username" className="form-control" defaultValue={this.state.username}/>
                    </div>

                    <div className="form-group">
                        <label>Age:</label>
                        <input type="number" placeholder="age" name="age" className="form-control" value={this.state.age} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>

                    <button className="save" onClick={this.saveUser}>Save</button>
                </form>
            </div>
        );
    }
}

export default edidUser;