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
//    filterList = (event) => {
//          let items = this.state.initialItems;
//          items = items.filter((item) => {
//            return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
//          });
//          this.setState({items: items});
//     }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

     render() {
          return (
            <div>
              <form>
                    <input type="text" placeholder="Search" onChange={this.filterList}/>
              </form>
              <div>
                {
                    this.state.items.map(function(item) {
                        return <div key={item}>{item}</div>
                    })
                }
                </div>
            </div>
          );
     }
}

export default Search;