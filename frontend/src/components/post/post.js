import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';

import {Form , FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Post extends Component{

    
    constructor(){
        super();
        this.state = {
            content: '',
            email: '',
            fandomId: '',
            title: '',
            status:false
        };
        this.addPost = this.addPost.bind(this);
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    addPost = (e) => {
        e.preventDefault();
        if (!this.state.email){
            alert("Please log in first")
            this.props.history.push('/Login');
        }
        else{
            let user = {
                content: this.state.content,
                fandomId: this.state.fandomId,
                email: this.state.email,
                title: this.state.title
            };
            console.log(user);
            ApiService.createPost(user)
                .then(res => {
                    console.log("Success");
                    let data = res.data;
                    console.log(data.id);
                    this.state.status = true;
                    this.props.history.push(`/fandom/`+this.state.fandomId);

                })
                .catch(error => {
                    console.log("Fail");
                });
        }
    };

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.email = Cookies.get('email');
        this.state.fandomId = params.fandomId;
    }

    goToFandom = () => {
        this.props.history.push(`/fandom`);
    };

    render() {
        return (
                <form className="form">
                <h2>Create Post</h2>
                    <div className="form-group">
                        <label className="form-label">Title:</label>
                        <Input type="text" placeholder="title" name="title" className="form-control" value={this.state.title} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">content:</label>
                        <textarea placeholder = "Enter you post here" name="content" className="form-control" value={this.state.content} onChange={this.onChange}></textarea>         
                    </div>
                    <div className="button-div">
                        <Button className="Post" onClick={this.addPost}>Post</Button>
                        <Button className="Cancel" onClick={this.goToFandom}>Cancel</Button>
                    </div>
                </form>
        );
    };
}


export default Post;