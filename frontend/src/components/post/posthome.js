import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Spinner, Jumbotron, Button, Alert, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import './posthome.css';
import  {Redirect} from 'react-router-dom';
import { FiThumbsUp } from 'react-icons/fi'
import { IconContext } from "react-icons";
import {Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import CommentCards from './commentCard';
import {Icon} from 'antd';
import {Input} from "@material-ui/core";


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
            oname:"",
            userId: "",
            islike: false,
            date: "",
            fandomId: "",
            level:""
        };
        this.getPost = this.getPost.bind(this);
        // this.getComments= this.getComments.bind(this);
        this.addComment = this.addComment.bind(this);
        this.like = this.like.bind(this);
        this.haslike = this.haslike.bind(this);
        this.likeIcon = this.likeIcon.bind(this);
        this.dislike = this.dislike.bind(this);
        this.look =this.look.bind(this);
        this.changePost = this.changePost.bind(this);
        this.goToFandom = this.goToFandom.bind(this);
        this.loadUser= this.loadUser.bind(this);
        // this.deletePost = this.deletePost.bind(this);
        // this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.postId = params.postId;
        this.state.fandomId = params.fandomId;
        this.state.email = Cookies.get('email');
        this.getPost();
        this.haslike();

        // this.getComments();
        console.log("States");
        console.log(this.state);
    }

    loadUser() {
        let param = {email:this.state.owner};
        ApiService.getUser(param)
            .then((res) => {
                console.log("Good");
                let user = res.data;
                if (user){
                    console.log(user);
                    this.setState({
                        userId: user.id,
                        oname: user.firstName
                    });
                    console.log("Good end");
                    console.log(this.state);
                    this.getUserLevel();
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

    getUserLevel(){
        let query = {
            uid: this.state.userId,
            fid: this.state.fandomId};
        ApiService.getLevel(query)
            .then(res => {
                let data = res.data;
                if(data){
                    this.setState({ level: data.level});
                    console.log("Searching for Events");
                    console.log(this.state);
                }
            })
            .catch(error => {
                console.log("Fail to get Events");
            });
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
                        owner: data.email
                    });
                   this.loadUser();
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

    haslike() {
        let query = {
            email: this.state.email,
            postId: this.state.postId
        };
        ApiService.isliked(query).then(res => {
            console.log("Success");
            console.log(res)
            let data = res.data;
            console.log(data)
            this.setState({islike:data})
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

    likeIcon = () => {
        console.log("Funciton ")
        if (this.state.islike){
            return "filled";
        }
        else{
            return "outlined";
        }
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    
    look() {
        if (this.state.islike){
            this.dislike()
        }
        else{
            this.like()
        }
    }
    
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
                this.setState({likeNum: data})
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
    
        
    }

    dislike = () => {
        let query = {
            email: this.state.email,
            postId: this.state.postId
        };
        console.log(query)
        if (this.state.email){
            ApiService.dislike(query).then(res => {
                console.log("Success");
                console.log(res)
                let data = res.data;
                console.log(data)
                this.setState({likeNum: data})
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
    
        
    }

    changePost = (e) => {
        e.preventDefault();
        let user = {
            content: this.state.content,
            id: this.state.postId,
            title: this.state.title
        };
        console.log(user);
        ApiService.editPost(user)
            .then(res => {
                console.log("Success");
                alert("Succesfully changed")
                let data = res.data;
                window.location.reload();

            })
            .catch(error => {
                console.log("Fail");
            });
    }

    // deletePost = (e) => {
    //     e.preventDefault();
    //     let user = {
    //         id: this.state.postId,
    //     };
    //     console.log(user);
    //     ApiService.deletePost(user)
    //         .then(res => {
    //             console.log("Success");
    //             alert("Succesfully deleted")
    //             let data = res.data;
    //             this.goToFandom()

    //         })
    //         .catch(error => {
    //             console.log("Fail");
    //         });
    // }

    goToFandom(){
        this.props.history.push('/fandom/'+this.state.fandomId);
    }

    render() {

        if(this.state.loading || this.state.level === '') {
            return <div className='loading'><Spinner animation='grow' variant="light"/></div>
        } 

        if (this.state.email === this.state.owner){
            return( 
                <div>
                    <form className="form">
                    <h2>Edit Post</h2>
                    <div className="form-group">
                        <label className="form-label">Title:</label>
                        <Input type="text" placeholder="title" name="title" className="form-control" defaultValue={this.state.title} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">content:</label>
                        <textarea placeholder = "Enter you post here" name="content" className="form-control" defaultValue={this.state.content} onChange={this.onChange}></textarea>         
                    </div>
                    <div className="button-div">
                        <Button className="Post" onClick={this.changePost}>Post</Button>
                        <Button className="Cancel" onClick={this.goToFandom}>Cancel</Button>
                        {/* <Button className="Delete" onClick={this.deletePost}>Delete</Button> */}
                    </div>
                    </form>
                    <div className="like" style={{cursor: 'pointer', marginLeft:"20%", width:"10%"}} onClick={this.look}>
                    <Icon type="like" theme={this.likeIcon()}/>
                        {this.state.likeNum}
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
                                            <td>{<CommentCards comment={item} />}</td>
                                        </tr>
                                    ))}
                                </table>
                    </div>
             </div>
            )}
        else{
        return(
            <div className="body">
                <div className="title">
                    {this.state.title}
                </div>
                <div className="date">
                    <p>From <a href={"/user/" + this.state.owner}>{this.state.oname}</a> as {this.state.level}</p>
                </div>
                <div className="date">
                    {this.state.date}
                </div>
                <div className="txt">
                    {this.state.content}
                </div>
                <div className="like" style={{cursor: 'pointer', marginLeft:"20%", width:"10%"}} onClick={this.look}>
                <Icon type="like" theme={this.likeIcon()}/>
                        {this.state.likeNum}
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
                                        <td>{<CommentCards comment={item} />}</td>
                                    </tr>
                                ))}
                            </table>
                 </div>
            </div>
            )          
        }
    }
    
}


export default PostHome;