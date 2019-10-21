import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';

class Navbar extends Component{
    render(){
        return (
                    <div classNmae="primary" id="navbar">
                      <a href="/">Home</a>
                      <a href="/friend">Friend</a>
                      <a href="/fandom">Fandom</a>
                    </div>
                );
    }
}
export default Navbar;