import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Spinner, Image, Figure} from 'react-bootstrap';
import Cookies from 'js-cookie';
import "./editUser.css";
import { encode } from 'punycode';
import 'bootstrap/dist/css/bootstrap.css';
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';



class edidUser extends Component{
    constructor(){
        super();
        this.state = {
         firstname: '',
         lastname: '',
         password: '',
         email: '',
         age: '',
         file:null,
         path: "",
         loading: true
        };
        this.loadUser = this.loadUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.logout = this .logout.bind(this);
        this.upload = this.upload.bind(this);
        this.loadImage = this.loadImage.bind(this);
    }

     componentDidMount() {
         this.loadUser();
         this.loadImage();
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

    upload = () => {
        const fd = new FormData();
        fd.append('file', this.state.file);
        fd.append('email', this.state.email);
        console.log(this.state);
        console.log(fd);
        ApiService.uploadImage(fd)
        .then(res => {
            if(res.data){
               alert("Successfully updated")
               window.location.reload();
            }
            this.props.history.push('/');
        })
        .catch(err => {
           console.log("Error");
        });
    }
    
    loadImage() {
        console.log(this.state)
        let param = {email:Cookies.get('email')};
        ApiService.getImage(param)
        .then((res) => {
            console.log(res);
            console.log("Good Image");
            let data = res.data;
            if (data){
                console.log(data);
                this.setState({
                    file: data,
                    path: `data:${res.headers['content-type']};base64, ${data}`
                })
                console.log("Good Image Start");
                console.log(this.state);
                console.log(data.json().blob());
                console.log("Good Image end");
            }
            else{
                this.props.history.push('/');
            }
        })
        .catch(err=>{
            console.log("Error Image");
            console.log(err);
        });
    }

    filechange = event =>{
        this.setState(
            {file:event.target.files[0],
            path: URL.createObjectURL(event.target.files[0])
            })
        console.log("Upload Image")
        console.log(this.state)
        console.log(this.state.file)
    }
    render() {
        if (this.state.loading){
                return <Spinner animation="grow"/>
        }
        return (
            <div>
             <h2 className="text-center">Profile</h2>
                <div className="load">
                        <div className='image-div'>
                            <Figure.Image
                                width={180}
                                height={180}
                                alt="180x180"
                                src={this.state.path}
                                style={{
                                    min_width: '100%',
                                    min_height: '100%'
                                }}
                                roundedCircle
                            />
                        </div>
                        <div>
                            <input ref = {fileInput => this.fileiInput = fileInput} style={{display: 'none'}} type="file" onChange={this.filechange} accept="image/*"/>
                            <button className="save" onClick={() => this.fileiInput.click()}>New Avatar</button>
                            <button className="save" onClick={this.upload}>Change</button>
                        </div>
                </div>
                <form className="form">
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