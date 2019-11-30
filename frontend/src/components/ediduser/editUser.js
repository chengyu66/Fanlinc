import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Spinner, Form, Figure, Button} from 'react-bootstrap';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import "./editUser.css";
import 'bootstrap/dist/css/bootstrap.css';
import FandomCards from "../fandomhome/fandomCard";



class edidUser extends Component{
    constructor(){
        super();
        this.state = {
            userId: 0,
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            age: '',
            file:null,
            path: "",
            loading: true,
            fandomsIn: []
        };
        this.loadUser = this.loadUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.logout = this .logout.bind(this);
        this.upload = this.upload.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.getFandomsUserIn = this.getFandomsUserIn.bind(this);
        this.displayAvatar = this.displayAvatar.bind(this);
    }

     componentDidMount() {
        const { match: { params } } = this.props;
        this.state.email = params.email;
        this.loadUser();
        this.loadImage();
     }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    loadUser() {
        let param = {email:this.state.email};
        ApiService.getUser(param)
            .then((res) => {
                console.log("Good");
                let user = res.data;
                if (user){
                    console.log(user);
                    this.setState({
                        userId: user.id,
                        firstname: user.firstName,
                        lastname: user.lastName,
                        password: user.password,
                        age: user.age,
                        email: user.email,
                        loading: false
                    });
                    console.log("Good end");
                    console.log(this.state);
                    this.getFandomsUserIn(user.id);
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
    };

    saveUser = (e) => {
         e.preventDefault();
         let user = {firstName: this.state.firstname, lastName:this.state.lastname, password: this.state.password, age: this.state.age, email: this.state.email};
         console.log(user);
         ApiService.setUser(user)
             .then(res => {
                 if(res.data){
                    alert("Successfully updated");
                    window.location.reload();
                    Cookies.set('username', this.state.firstname)
                 }
                 this.props.history.push('/');
             })
             .catch(err => {
                console.log("Error");
             });
    };

    upload = () => {
        const fd = new FormData();
        fd.append('file', this.state.file);
        fd.append('email', this.state.email);
        console.log(this.state);
        console.log(fd);
        ApiService.uploadImage(fd)
        .then(res => {
            if(res.data){
               alert("Successfully updated");
               window.location.reload();
            }
            this.props.history.push('/');
        })
        .catch(err => {
           console.log("Error");
        });
    };
    
    loadImage() {
        console.log(this.state);
        let param = {email:this.state.email};
        ApiService.getImage(param)
        .then((res) => {
            console.log(res);
            console.log("Good Image");
            let data = res.data;
            if (data){
                this.setState({
                    file: data,
                    path: `data:${res.headers['content-type']};base64, ${data}`
                });
                console.log("Good Image Start");
                console.log(this.state);
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

    displayAvatar() {
        return (<div className='image-div'>
            <Figure.Image width={180} height={180}
                alt="180x180"
                src={this.state.path}
                style={{
                    min_width: '100%',
                    min_height: '100%'
                }}
                roundedCircle
            />
        </div>);
    }

    filechange = event =>{
        this.setState(
            {file:event.target.files[0],
            path: URL.createObjectURL(event.target.files[0])
            });
    };


    getFandomsUserIn(userId) {
        let query = {userId: userId};
        console.log(query);
        ApiService.getFandomsUserIn(query)
            .then((res) => {
                console.log(res);
                let data = res.data;
                if (data){
                   this.setState({
                       fandomsIn: data
                   });
                }
            })
            .catch(err=>{
                console.log(err);
            });
    }

    displayFandomsUserIn() {
        let column = 3;
        let cardTable = [];
        let len = this.state.fandomsIn.length;
        let row = Math.ceil(len / column);
        console.log("row = " + row);
        for (let i = 0; i < row; i++) {
            let row = [];
            let j = 0;
            console.log("i = " + i);
            while (j < column && j < (len - ( i * column))) {
                console.log("j = " + j);
                row.push(<td><FandomCards fandomId={this.state.fandomsIn[(i * column)+j].fandomId}/></td>);
                j++;
            }
            cardTable.push(<tr>{row}</tr>);
        }
        return cardTable;
    }

    render() {

        if (this.state.loading){
                return <div className='loading-spinner'><Spinner animation='grow' variant="light"/></div>;
        }

        const { match: { params } } = this.props;
        if (params.email !== Cookies.get('email')){
            return (
                // <div>
                //  <h2 className="text-center">Profile</h2>
                //     <div className="load">
                //             <div className='image-div'>
                //                 <Figure.Image
                //                     width={180}
                //                     height={180}
                //                     alt="180x180"
                //                     src={this.state.path}
                //                     style={{
                //                         min_width: '100%',
                //                         min_height: '100%'
                //                     }}
                //                     roundedCircle
                //                 />
                //             </div>
                //     </div>
                //     <form className="form">
                //         <div className="form-group">
                //             {this.state.firstname}
                //         </div>
                //         <div className="form-group">
                //             {this.state.lastname}
                //         </div>

                //         <div className="form-group">
                //             {this.state.email}
                //         </div>

                //     </form>
                // </div>
                <div>
                    <aside className="profile-card">
                        <header>
                            <h2 className="profile">Profile</h2>
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
                            </div>
                            <div className="test">
                                <div className="name">
                                    {this.state.firstname + this.state.lastname}
                                </div>
                                <div className="form-group">
                                    {this.state.email}
                                </div>
                            </div>
                        </header>
                    </aside>

                    <hr/>

                    <div className='fandoms-table-div'>
                        <h3>Fandoms</h3>
                        <table>
                            {this.displayFandomsUserIn()}
                        </table>
                    </div>
                </div>


            );
        }
        else{
            return (
                <div>
                <h2 className="text-center">Profile</h2>
                    <div className="load">
                        {this.displayAvatar()}
                        <div>
                            <input ref = {fileInput => this.fileiInput = fileInput} style={{display: 'none'}} type="file" onChange={this.filechange} accept="image/*"/>
                            <button className="save" onClick={() => this.fileiInput.click()}>New Avatar</button>
                            <button className="save" onClick={this.upload}>Change</button>
                        </div>

                    </div>

                    <div id='info-form' className='info-form-div'>
                        <form className='info-form form'>
                            <div className="form-group">
                                <label className="form-label">First Name:</label>
                                <Input type="text" placeholder="firstname" name="firstname" defaultValue={this.state.firstname} onChange={this.onChange}/>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Last Name:</label>
                                <Input type="text" placeholder="lastname"  name="lastname" defaultValue={this.state.lastname} onChange={this.onChange}/>
                            </div>

                            {/* <div className="form-group">
                            <label>Age:</label>
                            <input type="number" placeholder="age" name="age" defaultValue={this.state.age} onChange={this.onChange}/>
                        </div> */}

                            <div className="form-group">
                                <label className="form-label">Email:</label>
                                <Input type="email" placeholder="email" name="mail" defaultValue={this.state.email} onChange={this.onChange}/>
                            </div>

                            <button className="save" onClick={this.saveUser}>Save</button>
                            <button className="logout" onClick={this.logout}>Log out</button>
                        </form>
                    </div>

                    <div className='fandoms-table-div'>
                        <h3>Fandoms</h3>
                        <table>
                            {this.displayFandomsUserIn()}
                        </table>
                    </div>
                </div>

        );
    }
    }
}

export default edidUser;