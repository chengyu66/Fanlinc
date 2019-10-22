import React, { Component } from 'react';
import "./navbar.css";

class Navbar extends Component {
    render(){
        return (
                    <header>
                      <div className="container">
                        <div id="branding">
                          <h1><a href="/"><span className="highlight">Fan</span>linx</a></h1>
                        </div>
                        <nav>
                          <ul>
                            <li><a href="/">Home</a></li>
                            <li className="current"><a href="#">About</a></li>
                            <li><a href="#">Fandoms</a></li>
                            <li><a href="/Login">Signin/Signup</a></li>
                          </ul>
                        </nav>
                      </div>
                    </header>
                );
    }
}
export default Navbar;