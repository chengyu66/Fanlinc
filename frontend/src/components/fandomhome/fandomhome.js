import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class FandomHome extends Component {
    constructor(){
        super();

        this.state = {
            data: [],
            loading: true
        };
        
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.fandomId = params.fandomId;
        this.getFandom();
    }

    getFandom() {
        let fandom = {id: this.state.fandomId};
        ApiService.getFandom(fandom)
        .then(res => {
               let data = res.data;
               if (data){
                   this.setState({data, loading: false});
                   console.log("Find the fandom");
                //    console.log(data);
                //    console.log(this.state);
               }
               else{
                this.props.history.push('/notFind');
               }
           })
           .catch(error => {
               console.log("Fail");
           });
   };

    render() {
        if(this.state.loading) {
            return 'Loading...'
        }
        return (
        <Jumbotron fluid>
            <h1>Welcome to {this.state.data.fandomName}</h1>
            <h2> </h2>
            <p>Fandom ID: {this.state.data.fandomId}</p>
            <p>Owner: {this.state.data.user[0].firstName} {this.state.data.user[0].lastName}</p>
        </Jumbotron>
    )
            
    }
    
}


export default FandomHome;