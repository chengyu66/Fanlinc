import React, { Component } from 'react';
import "./navbar.css";
import Cookies from 'js-cookie';

class Navbar extends Component {
    constructor() {
            super();
            this.state = {
                username: 'Sign in',
                link:'/Login'
            };

        }
    look() {
        if (Cookies.get('username')) {
                this.state.username = Cookies.get('username');
                this.state.link = '/editUser';
          }
    }

    render(){
        return (
                    <header>
                      <div className="container">
                        <div id="branding">
                          <h1><a href="/"><span className="highlight">Fan</span>linx</a></h1>
                        </div>
                        <nav>
                          <ul>
                            {this.look()}
                            <li><a href="/">Home</a></li>
                            <li className="current"><a href="#">About</a></li>
                            <li><a href="#">Fandoms</a></li>
                            <li><a href={this.state.link}>{this.state.username}</a></li>
                          </ul>
                        </nav>
                      </div>
                    </header>
                );
    }
}
export default Navbar;