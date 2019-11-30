import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Jumbotron, Button, Alert, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import './posthome.css';
import  {Redirect} from 'react-router-dom';
import { FiThumbsUp } from 'react-icons/fi'
import { IconContext } from "react-icons";


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
            likeNum: 0,
            owner:"",
            date: ""
        };
        this.getPost = this.getPost.bind(this);
        // this.getComments= this.getComments.bind(this);
        this.addComment = this.addComment.bind(this);
        this.like = this.like.bind(this);
        // this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.postId = params.postId;
        this.state.email = Cookies.get('email');
        this.getPost();
        // this.getComments();
        console.log("States");
        console.log(this.state);
    }

    getPost() {
        let postId = {id: this.state.postId};
        ApiService.getPost(postId)
        .then(res => {
               let data = res.data;
               if (data){
                    this.setState({
                        loading:false,
                        title:data.title,
                        content:data.content,
                        date:data.time,
                        likeNum:data.likeNum,
                        comments: data.comment,
                        owner: data.ownerEmail
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

    // getComments(){
    //     let postId = {post_id: this.state.postId};
    //     ApiService.getComments(postId)
    //     .then(res => {
    //            let data = res.data;
    //            if (data){
    //                this.state.loading = false;
    //                this.state.comments = data;
    //                console.log("Find Post");
    //                this.props.history.push(this.props)
    //            }
    //            else{
    //             this.props.history.push('/notFind');
    //            }
    //        })
    //        .catch(error => {
    //            console.log("Fail");
    //        });
    // }

    addComment = (e) => {
        e.preventDefault();
        let user = {
            content: this.state.comment,
            email: this.state.email,
            postid: this.state.postId
        };
        if (this.state.email){
            console.log(user);
            ApiService.createComment(user)
            .then(res => {
                console.log("Success");
                let data = res.data;
                console.log(data.id);
                window.location.reload();

            })
            .catch(error => {
                console.log("Fail");
            });
        }
        else{
            alert("Please Log in First");
            this.props.history.push('/login');
        }
        
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    like = () => {
        let query = {
            email: this.state.email,
            postId: this.state.postId
        };
        console.log(query)
        if (this.state.email){
            ApiService.addlike(query).then(res => {
                console.log("Success");
                console.log(res)
                let data = res.data;
                console.log(data)
                // window.location.reload();
            })
            .catch(error => {
                console.log("Fail");
            });
        }
        else{
            alert("Please Log in First");
            this.props.history.push('/login');
        }
    }

    render() {

        if(this.state.loading) {
            return (<div className='loading'><Spinner animation='grow' variant="info"/></div>);
        }

        return(
            <div className="body">
                <div className="title">
                    {this.state.title}
                </div>
                <div className="date">
                    {this.state.date}
                </div>
                <div className="txt">
                    {this.state.content}
                </div>
                <div className="like" style={{cursor: 'pointer', marginLeft:"20%", width:"10%"}} onClick={this.like}>
                        <IconContext.Provider value={{ color: "blue"}}>
                            <FiThumbsUp size={50}/>
                            {this.state.likeNum}
                        </IconContext.Provider>
                </div>
                <div className="commentBody">
                    <div id="comment" className="form-group">
                            <label>Commnet:</label>
                            <textarea placeholder = "Enter your Comment here" name="comment" className="form-control" defaultValue={this.state.comment} onChange={this.onChange}></textarea>   
                            <div className="button-div">
                                <Button className="Comment" onClick={this.addComment}>Add Comment</Button>
                            </div>      
                    </div>
                            <table>
                                {this.state.comments.map(item => (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>: </td>
                                        <td>{item.content}</td>
                                    </tr>
                                ))}
                            </table>
                 </div>
            </div>
        )          
    }
    
}


export default PostHome;