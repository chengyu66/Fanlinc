import React, { Component } from "react";
import ApiService from '../../services/apiservice';


class FandomHome extends Component {
    constructor(){
        super();

        this.state = {
            fandomId: "",
            fandomName: "",
            fandomOwnerId: ""
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
               console.log("Success");
               let data = res.data;
               if (data){
                   this.state.fandomName = data.fandomName;
                   this.state.fandomOwnerId = data.fandomOwnerId + "";
                   console.log("Find the fandom");
                   console.log(data);
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
        return (
            <div>
                <p1>{this.state.fandomId}</p1>
                <p1>{this.state.fandomName}</p1>
            </div>
        )
    }



    
}






export default FandomHome;