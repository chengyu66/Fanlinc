import React, { Component } from "react";

class About extends Component{
    constructor() {
        super();
    }

    render() {
        return(
            <div className="text-center">
                <h1>About</h1>
                <h2>CSCC01 Course Project</h2>
                <p>Designed and implemented by Team Of 7</p>
                <p>Source Code: <a href="https://github.com/UTSCCSCC01/project-teamof7" target="_blank">Github</a></p>
            </div>
        );
    }

}
export default About;