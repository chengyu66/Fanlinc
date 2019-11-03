import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';
import {Button, Input } from "@material-ui/core";
import Cookies from 'js-cookie';

class Search extends Component{
    constructor(){
        super();
        this.state = {
         items: []
        };
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

     render() {
          return (
            <div>
              <form>
                    <input type="text" placeholder="Search" onChange={this.onChange}/>
              </form>
            </div>
          );
     }
}

export default Search;