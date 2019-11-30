import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Table, Button, Spinner} from "react-bootstrap";
import {Input} from "@material-ui/core";
import Cookies from "js-cookie";
import './createFandom.css';
import Search from "../searchbar/search";
import FandomCards from '../fandomhome/fandomCard';

class CreateFandom extends Component {
    constructor(){
        super();

        this.state = {
            fandomName: "",
            data: [],
            loading: true,
            items: []
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
            let query = { email: Cookies.get('email'),
                          fandomName: this.state.fandomName };
            ApiService.createFandom(query)
                .then(res => {
                    if (res.data.fandomId != null){
                        console.log(res.data.fandomId);
                        console.log("Create New");
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

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params);
        console.log(this.state.query);
        this.search();
        console.log(this.state);
    }
    search = (e) => {
        // e.preventDefault();
        let query = {name: ""};
        console.log(query);
        ApiService.seachfandom(query)
        .then(res => {
               console.log("Success");
               let data = res.data;
               if (data.length > 0){
                   this.state.items = data
                   this.setState({loading: false});
                   console.log(this.state);
                   console.log(data);
               }
               else{
                   alert("Not found");
                   this.props.history.push("/")
               }
           })
           .catch(error => {
               console.log("Fail");
           });
   };

   displayFandoms(){
    let column = 4;
    let cardTable = [];
    let len = this.state.items.length;
    let row = Math.ceil(len / column);
    console.log("row = " + row);
    for (let i = 0; i < row; i++) {
        let row = [];
        let j = 0;
        console.log("i = " + i);
        while (j < column && j < (len - ( i * column))) {
            console.log("j = " + j);
            row.push(<td><FandomCards fandomId={this.state.items[(i*4)+j].fandomId}/></td>);
            j++;
        }
        cardTable.push(<tr>{row}</tr>);
    }
    return cardTable;
}

    render(){
        if(this.state.loading) {
            return <div className='loading'><Spinner animation='grow' variant="light"/></div>
        } 
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
                <div className="fandoms-table-div">
                    <h2>Fandoms</h2>
                    <Table>{this.displayFandoms()}</Table>
                </div>
            
        </div>
        )
    }

}

export default CreateFandom;