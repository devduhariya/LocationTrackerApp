/*global google*/
import React, { Component, } from 'react'

import { GoogleMap, } from "@react-google-maps/api";
import {
    withGoogleMap,
    DirectionsRenderer
} from "react-google-maps";

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            directions: null,
            options: '',
            destinations: [],
            origins: [],
            waypts: [],
            distanceCoverd: null,
            duration: null

        }
        this.renderMapRoute = this.renderMapRoute.bind(this);
        this.updateMap = this.updateMap.bind(this);
        // this.setZeroHoursMinuteSeconds = this.setZeroHoursMinuteSeconds.bind(this);
        // console.log("users data in map", this.props)
    }
    componentDidMount() {
        this.updateMap();
    }
    componentDidUpdate(prevProps) {
        // console.log("pre props: ", prevProps);
        // console.log(prevProps.userData !== this.props.userData);
        if (prevProps.userData !== this.props.userData) {
            this.updateMap();
        }
    }
    // setZeroHoursMinuteSeconds(date) {
    //     const dt = new Date(date);
    //     dt.setHours(0);
    //     dt.setMinutes(0);
    //     dt.setSeconds(0);
    //     return dt;
    // }
    updateMap() {
        const { userData } = this.props;
        console.log("users data in map update map: ", userData);
        this.directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
        let desinations = [];
        let waypoints = [];
       
        let origin = { lat: userData.coordinates[0].lat, lng: userData.coordinates[0].lng };
        for (let i = 0; i < userData.coordinates.length; i++) {
            desinations.push({ lat: userData.coordinates[i].lat, lng: userData.coordinates[i].lng });
            // console.log("------");
            waypoints.push({
                location: userData.coordinates[i],
                stopover: false
            });
        }
        console.log("waypts: ", waypoints);
        this.setState({
            waypts: waypoints,
            destinations: desinations
        })
        this.renderMapRoute(origin, desinations[desinations.length - 1], waypoints);
    }
    renderMapRoute(origin, destination, waypoints) {
        const directionsService = new google.maps.DirectionsService();
        // console.log('96 no line: ', { origin, destination, });
        // console.log('this.directionsDisplay: ', this.directionsDisplay);
        // console.log('this.state.waypts: ', waypoints)
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.WALKING,
                waypoints: waypoints,

            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result
                    });
                    console.log("result: ", result);
                }
                // else {
                //     console.error(`error fetching directions ${result}`);
                // }
                var route = result.routes[0];
                // for (var i = 0; i < route.legs.length; i++) {
                this.setState({
                    distanceCoverd: route.legs[0].distance.text,
                    duration: route.legs[0].duration.text
                })
            }
        );
    }
    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{
                    lat: 20.5937,
                    lng: 78.9629
                }}
                defaultZoom={14}
            >

                {this.state.directions ? <DirectionsRenderer
                    directions={this.state.directions}
                /> : ''}


            </GoogleMap>
        ));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        {
                            this.state.destinations.length > 0 ? (
                                <GoogleMapExample
                                    containerElement={<div style={{ height: `600px`, width: "600px" }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                />
                            ) : 'Loading ...'
                        }
                    </div>
                    <div className="col-sm-4">
                        <h3>Distance :{this.state.distanceCoverd}</h3>
                        <h3>Time :{this.state.duration}</h3>
                    </div>
                </div>
            </div>
        );

    }

}
export default Map;


// c = [];