import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import {Card, Form , FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class FandomCards extends Component{

    constructor(){
        super();
        this.state = {
            ownerEmail: '',
            fandomId: '',
            fandomName:'',
            array: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"],
            num: 0,
            status:false
        };
        this.getFandom = this.getFandom.bind(this);
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    componentWillMount() {
        this.state.fandomId = this.props.fandomId;
        this.getFandom();
        this.state.num = Math.floor(Math.random() * this.state.array.length);
    }

    getFandom() {
        let fandom = {id: this.state.fandomId};
        ApiService.getFandom(fandom)
        .then(res => {
               let data = res.data;
               if (data){
                   this.setState({
                       ownerEmail:data.ownerEmail,
                       fandomName:data.fandomName, 
                       loading: false});
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

    goToFandom = () => {
        this.props.history.push(`/fandom`);
    };

    render() {
        return (
            <div>
                <a href={"/fandom/"+this.state.fandomId}>
                <Card border={this.state.array[this.state.num]} style={{ width: '18rem' }}>
                <Card.Header>Fandom</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.fandomName}</Card.Title>
                        <Card.Text>
                            {this.state.ownerEmail}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
            </div>
        );
    };
}


export default FandomCards;