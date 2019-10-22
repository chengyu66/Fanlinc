import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';

class Navbar extends Component{
    render(){
        return (
                    <header>
                          <div class="container">
                            <div id="branding">
                              <h1><a href="/"><span class="highlight">Fan</span>linx</a></h1>
                            </div>
                            <nav>
                              <ul>
                                <li><a href="/">Home</a></li>
                                <li class="current"><a href="#">About</a></li>
                                <li><a href="#">Fandoms</a></li>
                                <li><a href="/login">Signin/Signup</a></li>
                              </ul>
                            </nav>
                          </div>
                        </header>
                );
    }
}
export default Navbar;