import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import ApiService from "../../services/apiservice";
import {Card, Spinner} from "react-bootstrap";

const mapStyles = {
    width: '100%',
    height: '100vh',
};

class EventMap extends Component {

    constructor() {
        super();

        this.state = {
            loading: true,
            eventId: '',
            description: '',
            email: '',
            fandomId: '',
            eventName: '',
            date:"",
            deadline:"",
            lat: 0,
            lng: 0,
            address: '',
            activeMarker: null,
            showingInfoWindow: false
        };

        this.getEvent = this.getEvent.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.state.eventId = params.eventId;
        this.getEvent();
        console.log(this.state);
    }

    getEvent(){
        let eventId = {id: this.state.eventId};
        ApiService.getEvent(eventId)
            .then(res => {
                let data = res.data;
                if (data){
                    //    this.state.loading = false;
                    this.setState({
                        loading: false,
                        eventName:data.eventName,
                        description:data.description,
                        owner:data.ownerEmail,
                        date:data.date,
                        deadline:data.deadline,
                        fandomId: data.fandomId,
                        lng: data.longitude,
                        lat: data.latitude,
                        address: data.address
                    });
                    console.log("Loading event");
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
        if(this.state.loading) {
            return (<Spinner animation="grow" />);
        }

        return (
            <Map
                google={this.props.google}
                zoom={15}
                style={mapStyles}
                initialCenter={{lat :this.state.lat, lng : this.state.lng}}>
                <Marker
                    position={{lat :this.state.lat, lng : this.state.lng}}
                    onClick={this.onMarkerClick}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>Event</Card.Header>
                            <Card.Body>
                                <a href={"/fandom/"+this.state.fandomId+"/event/"+this.state.eventId}><Card.Title>{this.state.eventName}</Card.Title></a>
                                <Card.Text>
                                    Address: {this.state.address}
                                </Card.Text>
                                <Card.Text>
                                    {this.state.date}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </InfoWindow>

            </Map>
        );
    }


}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBnWqvb-wjLsV-KKmV_05zkolugIirvF-0'
}) (EventMap);