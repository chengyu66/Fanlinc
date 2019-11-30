import React, { Component } from "react";
import ApiService from '../../services/apiservice';
import {Spinner} from 'react-bootstrap';
import Cookies from 'js-cookie';
import './eventhome.css';
import moment, {} from "moment";

class PostHome extends Component {
    constructor(){
        super();
        this.state = {
            eventName:"",
            description:"",
            owner:"",
            date:"",
            deadline:"",
            email:"",
            eventId:"",
            loading: true,
            lat: 0,
            lng: 0,
            address: '',
            placeId: ''
        };
        this.getEvent = this.getEvent.bind(this);
        this.join = this.join.bind(this);
        this.goToEventMap = this.goToEventMap.bind(this);
        this.ableToJoin = this.ableToJoin.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.eventId = params.eventId;
        this.state.email = Cookies.get('email');
        this.getEvent();
        console.log("States");
        console.log(this.state);
    }

    goToGoogleMap() {
        let linkToMap = "https://www.google.com/maps/search/?api=1&query="
            + this.state.lat + "," + this.state.lng +"&query_place_id=" + this.state.placeId;
        return <a href={linkToMap} target='_blank'>{this.state.address}</a>;
    }

    getEvent() {
        let eventId = {id: this.state.eventId};
        ApiService.getEvent(eventId)
        .then(res => {
               let data = res.data;
               if (data){
                //    this.state.loading = false;
                    this.setState({loading:false, 
                        eventName:data.eventName,
                        description:data.description,
                        owner:data.ownerEmail,
                        date: data.date,
                        deadline: data.deadline,
                        lng: data.longitude,
                        lat: data.latitude,
                        address: data.address,
                        placeId: data.placeId
                    });
               }
               else{
                this.props.history.push('/notFind');
               }
           })
           .catch(error => {
               console.log("Fail");
           });
    };

    join = (e) => {
        e.preventDefault();
        let user = {
            email: this.state.email,
            eventId:this.state.eventId
        };
        if (this.state.email){
            console.log(user);
            ApiService.joinEvent(user)
            .then(res => {
                let data = res.data;
                if (data){
                    console.log("Success");
                    alert("You have Succesfully Join the event");
                    window.location.reload();
                }
                else{
                    alert("You have already join the event")
                }
            })
            .catch(error => {
                console.log("Fail");
                alert("You Cannot join the event");
            });
        }
        else{
            alert("Please Log in First");
            this.props.history.push('/login');
        }
        
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    goToEventMap() {
        this.props.history.push(this.props.location.pathname + '/map');
    }

    ableToJoin() {
        let m = moment.now();
        if(moment(this.state.date).isBefore(m)) {
            return <em>Too late to Join the event.</em>
        } else {
            return (
                <div className="button-div">
                    <button className="join" onClick={this.join}>Join</button>
                </div>
            );
        }
    }

    render() {

        if(this.state.loading) {
            return (<div className='loading'><Spinner animation='grow' variant="dark"/></div>);
        }

        return(
            <div className="body">
                <div className="name">
                    {this.state.eventName}
                </div>
                <div className="date">
                    Date of event: {moment(this.state.date).format("LL")}
                </div>
                <div className="date">
                    Register Deadline: {moment(this.state.deadline).format("LL")}
                </div>
                <div className="description">
                    <p>{this.state.description}</p>
                    <p>Address: {this.goToGoogleMap()}</p>
                </div>
                <div className="buttons">
                    <p><button  classname="location" variant="primary" onClick={this.goToEventMap}>Location Info</button></p>
                    {this.ableToJoin()}
                </div>
            </div>
        )          
    }
    
}


export default PostHome;