import React, { Component } from 'react';
//import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';
import Cookies from 'js-cookie';

class edidUser extends Component{
    constructor(){
        super();
        this.state = {
         firstname: '',
         lastname: '',
         password: '',
         email: '',
         age: ''
        };
        this.loadUser = this.loadUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.logout = this .logout.bind(this);
    }

     componentDidMount() {
         this.loadUser();
     }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    loadUser() {
        let param = {email:Cookies.get('email')};
        ApiService.getUser(param)
            .then((res) => {
                console.log("Good");
                let user = res.data;
                this.state.firstname = user.firstName;
                this.state.lastname= user.lastName;
                this.state.password= user.password;
                this.state.age= user.age;
                this.state.email= user.email;
                console.log("Good end");
                console.log(this.state);
            })
            .catch(err=>{
                console.log("Error");
                console.log(err);
            });
    }

    logout =  (e) =>{
        e.preventDefault();
        Cookies.remove('id');
        Cookies.remove('email');
        Cookies.remove('username');
        this.props.history.push('/');
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
                        <label>First Name:</label>
                        <input type="text" placeholder="firstname" name="fname" value={this.state.firstname} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" placeholder="lastname"  name="lname" value={this.state.lastname} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Age:</label>
                        <input type="number" placeholder="age" name="age" value={this.state.age} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder="email" name="mail" value={this.state.email} onChange={this.onChange}/>
                    </div>

                    <button className="save" onClick={this.saveUser}>Save</button>

                    <button className="logout" onClick={this.logout}>Log out</button>
                </form>
            </div>
        );
    }
}

export default edidUser;