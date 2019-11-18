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
            email: ""
        };
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.postId = params.postId;
        this.email = Cookies.get('email');
        this.getPost();
        this.getComments();
        console.log(this.state);
    }

    getPost() {
        let postId = {id: this.state.postId};
        ApiService.getPost(postId)
        .then(res => {
               let data = res.data;
               if (data){
                   this.state.loading = false;
                   this.state.title = data.title;
                   this.state.content = data.content;
                    this.state.date = data.date;
                   console.log("Find the fandom");
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
        ApiService.getCommentes(postId)
        .then(res => {
               let data = res.data;
               if (data){
                   this.state.loading = false;
                   this.state.title = data.title;
                   this.state.content = data.content;
                    this.state.date = data.date;
                   console.log("Find the fandom");
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
            comment: this.state.comment,
            email: this.state.email,
            pid: this.state.postId
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
            <div>
                <div>
                    {this.state.title}
                </div>
                <div>
                    {this.state.date}
                </div>
                <div>
                    {this.state.content}
                </div>
                <div className="form-group">
                        <label className="form-label">Commnet:</label>
                        <textarea placeholder = "Enter your Comment here" name="comment" className="form-control" value={this.state.comment} onChange={this.onChange}></textarea>   
                        <div className="button-div">
                        <Button className="Comment" onClick={this.addComment}>Add Comment</Button>
                        </div>      
                </div>
                <div className="form-group">
                    <form>
                        <ul>
                            {this.state.items.map(item => (
                                <li id={item.commentId}>{item.name + "\n" + item.commnet}</li>
                            ))}
                        </ul>
                    </form>
                </div>
                

            </div>
        )          
    }
    
}


export default PostHome;