import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Jumbotron, Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import  {Redirect} from 'react-router-dom';

class PostHome extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            content: "",
            postId: "",
            comments: [],
            comment:"",
            loading: true,
            email: "",
            date: ""
        };
        this.getPost = this.getPost.bind(this);
        this.getComments= this.getComments.bind(this);
        this.addComment = this.addComment.bind(this);
        // this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.postId = params.postId;
        this.email = Cookies.get('email');
        this.getPost();
        this.getComments();
        console.log("States");
        console.log(this.state);
    }

    getPost() {
        let postId = {id: this.state.postId};
        ApiService.getPost(postId)
        .then(res => {
               let data = res.data;
               if (data){
                //    this.state.loading = false;
                    this.setState({loading:false, 
                        title:data.title,
                        content:data.content,
                         date:data.date
                    })
                   console.log("Find Post");
                   console.log(this.state.loading);
                   console.log("States");
                   console.log(this.state);    
               }
               else{
                this.props.history.push('/notFind');
               }
           })
           .catch(error => {
               console.log("Fail");
           });
    };

    getComments(){
        let postId = {id: this.state.postId};
        ApiService.getComments(postId)
        .then(res => {
               let data = res.data;
               if (data){
                   this.state.loading = false;
                   this.state.title = data.title;
                   this.state.content = data.content;
                    this.state.date = data.date;
                   console.log("Find Post");
               }
               else{
                this.props.history.push('/notFind');
               }
           })
           .catch(error => {
               console.log("Fail");
           });
    }

    addComment = (e) => {
        e.preventDefault();
        let user = {
            content: this.state.comment,
            email: this.state.email,
            post_Id: this.state.postId
        };
        console.log(user);
        ApiService.createComment(user)
            .then(res => {
                console.log("Success");
                let data = res.data;
                console.log(data.id);
                this.props.history.push(this.props)

            })
            .catch(error => {
                console.log("Fail");
            });
    };

    render() {

        if(this.state.loading) {
            return 'Loading...'
        } 

        return(
            <div className="form-group">
                <div className="form-group">
                    {this.state.title}
                </div>
                <div className="form-group">
                    {this.state.date}
                </div>
                <div className="form-group">
                    {this.state.content}
                </div>
                <div className="form-group">
                        <label className="form-label">Commnet:</label>
                        <textarea placeholder = "Enter your Comment here" name="comment" className="form-control" defaultValue={this.state.comment} onChange={this.onChange}></textarea>   
                        <div className="button-div">
                            <Button className="Comment" onClick={this.addComment}>Add Comment</Button>
                        </div>      
                </div>
                <div className="form-group">
                    <form>
                        <ul>
                            {this.state.comments.map(item => (
                                <li id={item.commentId}>{item.name + "\n" + item.comment}</li>
                            ))}
                        </ul>
                    </form>
                </div>
            </div>
        )          
    }
    
}


export default PostHome;