import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import ApiService from "../../services/apiservice";
import EventCard from "../event/eventCard";

const mapStyles = {
    width: '100%',
    height: '100vh',
};

class EventMap extends Component {

    constructor() {
        super();

        this.state = {
            eventId: '',
            description: '',
            email: '',
            fandomId: '',
            eventName: '',
            date:"",
            deadline:"",

            location: {
                lat: 0,
                lng: 0
            },
            activeMarker: null,
            showingInfoWindow: false
        };

        this.getEvent = this.getEvent.bind(this);
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.state.eventId = params.eventId;
        //this.setState({eventId: params.eventId});
        this.setState({
            location: {
                lat: params.lat,
                lng: params.lng
            }
        });
        //this.getEvent();
        console.log(this.state);
    }

    initialCenter() {
        let intial = {
            lat: 43.7184038,
            lng: -79.5181442
        };
        return intial;
    }

    getEvent(){
        let eventId = {id: this.state.eventId};
        ApiService.getEvent(eventId)
            .then(res => {
                let data = res.data;
                if (data){
                    //    this.state.loading = false;
                    this.setState({
                        loading:false,
                        eventName:data.eventName,
                        description:data.description,
                        owner:data.ownerEmail,
                        date:data.date,
                        deadline:data.deadline,
                        fandomId: data.fandomId
                    });
                    console.log("Find Post");
                    console.log(this.state.loading);
                    console.log("States");
                    console.log(this.state);
                }
                else{
                    this.props.history.push('/notFind');
                }
            })
            .catch(error => {
                console.log("Fail");
            });
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
        }
    };


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={this.initialCenter()}>


                <Marker
                    name={'UTSC'}
                    position={this.state.location}
                    onClick={this.onMarkerClick}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <EventCard eventId={this.state.eventId}/>
                    </div>
                </InfoWindow>

            </Map>
        );
    }


}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBnWqvb-wjLsV-KKmV_05zkolugIirvF-0'
}) (EventMap);