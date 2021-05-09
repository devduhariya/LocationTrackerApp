/*global google*/
import React, { Component, } from 'react'
import {
    withGoogleMap,
    GoogleMap,
    Polyline,
    Marker
} from "react-google-maps";
class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            waypts: [],
            distanceCoverd: null,
            defaultCenter: {
                lat: null,
                lng: null
            }
        }
        this.updateMap = this.updateMap.bind(this);
    }
    componentDidMount() {
        this.updateMap();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.userData !== this.props.userData) {
            this.updateMap();
        }
    }
    updateMap() {
        const { userData } = this.props;
        let waypoints = [];
        for (let i = 0; i < userData.coordinates.length; i++) {
            waypoints.push(userData.coordinates[i]);
        }
        this.setState({
            waypts: waypoints,
            defaultCenter: {
                lat: userData.coordinates[0].lat,
                lng: userData.coordinates[0].lng
            }
        })
        var latLngA = new google.maps.LatLng(userData.coordinates[0].lat, userData.coordinates[0].lng);
        var latLngB = new google.maps.LatLng(userData.coordinates[userData.coordinates.length - 1].lat, userData.coordinates[userData.coordinates.length - 1].lng)
        this.setState({
            distanceCoverd: google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB)
        })
    }
    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={this.state.defaultCenter}
            >
                <Polyline path={this.state.waypts} options={{ strokeColor: "#FF0000 " }} />
                <Marker position={this.state.waypts[this.state.waypts.length - 1]} />
            </GoogleMap>
        ))

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        {
                            <GoogleMapExample

                                containerElement={<div style={{ height: `600px`, width: "600px" }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        }
                    </div>
                    <div className="col-sm-4">
                        <h3>Distance : {((this.state.distanceCoverd)*1000/1000).toFixed(2)} Meters</h3>
                    </div>
                </div>
            </div>
        );
    }
}
export default Map;

