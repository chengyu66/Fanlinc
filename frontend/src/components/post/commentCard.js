import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import {Figure, Card, Form, FormControl, Button, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './commentCard.css';


class CommentCards extends Component{

    constructor(){
        super();
        this.state = {
            commentId: "",
            image: '',
            email: '',
            loading: true
        };
        this.loadImage = this.loadImage.bind(this);
    }

    loadImage() {
        console.log(this.state)
        console.log("Load image")
        let param = {email: this.state.email};
        // console.log(param)
        ApiService.getImage(param)
        .then((res) => {
            // console.log(res.data);
            // console.log("Good Image");
            let data = res.data;
            this.setState({
                image: `data:${res.headers['content-type']};base64, ${data}`,
                loading:false
            })
        })
        .catch(err=>{
            console.log("Error Image");
            console.log(err);
        });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    componentWillMount() {
        this.state.commentId=this.props.comment.commentId
        this.state.email=this.props.comment.email
        this.state.content=this.props.comment.content
        console.log(this.props.comment)
        console.log(this.stat)
        console.log("Check load")
        this.loadImage();
    }

    render() {

        if(this.state.loading) {
            return (<div className='loading'><Spinner animation='grow' variant="info"/></div>);
        }

        return (
            <div className="comment">
                <div className='comment-div'>
                     <a href={"/user/"+this.state.email}>
                            <Figure.Image
                                width={10}
                                height={10}
                                alt="180x180"
                                src={this.state.image}
                                style={{
                                    min_width: '100%',
                                    min_height: '100%'
                                }}
                                roundedCircle
                            />
                    </a>
                </div>
                 <div className="comment_body">
                    <h6>{this.state.email}</h6>
                    <p>{this.state.content}</p>
			 	</div>
            </div>
        );
    };
}


export default CommentCards;