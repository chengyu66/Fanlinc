import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Button} from "react-bootstrap";
import {Input} from "@material-ui/core";
import Cookies from "js-cookie";
import './createFandom.css';

class CreateFandom extends Component {
    constructor(){
        super();

        this.state = {
            fandomName: "",
            data: [],
            loading: true,
        };

        this.onChange = this.onChange.bind(this);
        this.createFandom = this.createFandom.bind(this);
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    createFandom(){
        if (!Cookies.get('username')) {
            alert("Please Log in First");
            this.props.history.push(`/login`);
        } else {
            let query = { ownerEmail: Cookies.get('email'),
                          fandomName: this.state.fandomName };
            ApiService.createFandom(query)
                .then(res => {
                    if (res.data.fandomId != null){
                        console.log(res.data.fandomId);
                        this.props.history.push('/fandom/' + res.data.fandomId);
                    } else {
                        alert("This name has been used, Please pick another");
                    }
                })
                .catch(error => {
                    console.log("Fail to Create");
                });
        }
    }

    render(){

        return (
        <div>
            <h2>Create your own Fandom!</h2>
            <form className="form">
                <div className="form-group">
                    <label className="form-label">Fandom:</label>
                    <Input type="fandomName" placeholder="FandomName" name="fandomName" className="form-control"  value={this.state.fandomName} onChange={this.onChange}/>
                </div>
                <div className="button-div">
                    <Button className="CreateFandom" onClick={this.createFandom}>Create</Button>
                </div>
            </form>
        </div>
        )
    }

}

export default CreateFandom;