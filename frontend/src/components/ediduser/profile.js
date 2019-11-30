import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Spinner, Image, Figure} from 'react-bootstrap';
import Cookies from 'js-cookie';
import "./editUser.css";
import { encode } from 'punycode';
import 'bootstrap/dist/css/bootstrap.css';
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';



class Profile extends Component{
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
        this.onChange = this.onChange.bind(this);
        this.loadImage = this.loadImage.bind(this);
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
    
    loadImage() {
        console.log(this.state)
        let param = {email:this.state.email};
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
                </div>
                <form className="form">
                    <div className="form-group">
                        {this.state.firstname}
                    </div>
                    <div className="form-group">
                        {this.state.lastname}
                    </div>

                    <div className="form-group">
                        {this.state.email}
                    </div>

                </form>
            </div>
        );
    }
}

export default Profile;