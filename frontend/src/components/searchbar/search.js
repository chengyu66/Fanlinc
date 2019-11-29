import React, { Component } from 'react';
import ApiService from '../../services/apiservice';
import {Input} from "@material-ui/core";
import Cookies from 'js-cookie';
import "./search.css";

import {Table, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FandomCards from '../fandomhome/fandomCard';

class Search extends Component{
    constructor(){
        super();
        this.state = {
         query: "",
         items: [],
         loading:true
        };
        this.search = this.search.bind(this);
        this.displayFandoms = this.displayFandoms.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params);
        this.state.query = params.query;
        console.log(this.state.query);
        this.search();
        console.log(this.state);
    }

    search = (e) => {
        // e.preventDefault();
        let query = {name: this.state.query};
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

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

     render() {
         if(this.state.loading){
                return <div className='loading'><Spinner animation='grow' variant="light"/></div>
         }
          return (
            <div className="search">
                <Table>{this.displayFandoms()}</Table>
            </div>
          );
     }
}

export default Search;