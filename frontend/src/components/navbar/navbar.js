import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';

class Navbar extends Component{
    render(){
        return (
                    <header>
                          <div class="container">
                            <div id="branding">
                              <h1><span class="highlight">Fan</span>linx</h1>
                            </div>
                            <nav>
                              <ul>
                                <li><a href="/">Home</a></li>
                                <li class="current"><a href="#">About</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="/login">Login</a></li>
                              </ul>
                            </nav>
                          </div>
                        </header>
                );
    }
}
export default Navbar;