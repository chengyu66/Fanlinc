import React, { Component } from 'react';
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
         age: '',
         loading: true
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
                if (user){
                    this.setState({
                        firstname: user.firstName,
                        lastname: user.lastName,
                        password: user.password,
                        age: user.age,
                        email: user.email,
                        loading: false
                    })
                    console.log("Good end");
                    console.log(this.state);
                }
                else{
                    this.props.history.push('/');
                }
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
         let user = {firstName: this.state.firstname, lastName:this.state.lastname, password: this.state.password, age: this.state.age, email: this.state.email};
         console.log(user);
         ApiService.setUser(user)
             .then(res => {
                 if(res.data){
                    alert("Successfully updated")
                    window.location.reload();
                    Cookies.set('username', this.state.firstname)
                 }
                 this.props.history.push('/');
             })
             .catch(err => {
                console.log("Error");
             });
    }
    render() {
        if (this.state.loading){
            return 'Loading...'
        }
        return (
            <div>
                <h2 className="text-center">Profile</h2>
                <form>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input type="text" placeholder="firstname" name="firstname" defaultValue={this.state.firstname} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" placeholder="lastname"  name="lastname" defaultValue={this.state.lastname} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Age:</label>
                        <input type="number" placeholder="age" name="age" defaultValue={this.state.age} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder="email" name="mail" defaultValue={this.state.email} onChange={this.onChange}/>
                    </div>

                    <button className="save" onClick={this.saveUser}>Save</button>

                    <button className="logout" onClick={this.logout}>Log out</button>
                </form>
            </div>
        );
    }
}

export default edidUser;