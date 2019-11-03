import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';
import {Button, Input } from "@material-ui/core";
import Cookies from 'js-cookie';
import "./search.css";

class Search extends Component{
    constructor(){
        super();
        this.state = {
         query: "",
         items: []
        };
        this.search = this.search.bind(this);
    }

    search = (e) => {
        e.preventDefault();
        let query = {name: this.state.query};
        console.log(query);
        ApiService.seachfandom(query)
        .then(res => {
               console.log("Success");
               let data = res.data;
               if (data){
                   this.state.items = data
                   console.log(data);
               }
               else{
                   alert("Not found");
               }
           })
           .catch(error => {
               console.log("Fail");
           });
   };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

     render() {
          return (
            <div>
              <form className="search">
                    <input type="text" name="query" placeholder="Search" onChange={this.onChange}/>
                    <Button className="button-div" onClick={this.search}>Search</Button>
              </form>
              <div>
                <ul>
                    {this.state.items.map(item => (
                        <li id={item.fandomid}>{item.fandomName}</li>
                    ))}
                </ul>
              </div>
            </div>
          );
     }
}

export default Search;