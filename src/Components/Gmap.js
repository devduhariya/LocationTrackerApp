import React, { Component } from 'react';
// import './App.css';
import axios from 'axios'
class Gmap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: null,
            lng: null,
            coordinates: [],
            userId: '',
            startDate: '',
            id: ''
        }
        this.getLocation = this.getLocation.bind(this);
        this.getcoordinates = this.getcoordinates.bind(this);
        this.saveLocation = this.saveLocation.bind(this)
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.getcoordinates);
        } else {
            alert('location not supported by this browser');
        }
    }
    getcoordinates(position) {
        this.saveLocation(position.coords.latitude, position.coords.longitude);
    }
    saveLocation(lat, lng) {
        const request = {
            lat: lat,
            lng: lng
        };
        const id = localStorage.getItem("id");
        console.log('local storage id: ', id);
        if (id === null  || id === undefined || id === "undefined") {
            axios.post('http://localhost:4000/location', (request), { withCredentials: true }).then(res => {
                localStorage.setItem("id", res.data.id);
            });
        } else {
            axios.patch('http://localhost:4000/location/' + id, request, { withCredentials: true }).then(res => {
            });
        }
        console.log("db save call request:", request)

    }

    getEndLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getcoordinates);
        } else {
            alert('location not supported by this browser');
        }
    }
    endLocation(lat, lng) {
        const request = {
            lat: lat,
            lng: lng
        };
        console.log('req',request);
        const id = localStorage.getItem("id");
        console.log("id:",id);
        if ((id === null && request===null) || (id === undefined && request===undefined) || id === "undefined") {
            alert("End Location is not found, please login again!");
            // this.logout();
            return;
        }
        console.log("request", request);
        axios.patch('http://localhost:4000/location/' + id, request, { withCredentials: true }).then(res => {
            console.log('endlocation',res )
            localStorage.removeItem("id");
        });
    }

    // endLocation() {
    //     console.log("end");
    //     const id = localStorage.removeItem("id");
    //     console.log("id: ", id);
    // }
    // componentDidMount() {
    //     // this.getLocation();
    // }
    render() {
        return (
            <div className="container">
                <button className="btn btn-primary my-5" onClick={this.getLocation}>Start</button>
                <button className="btn btn-danger my-5" onClick={this.endLocation}>End</button>
            </div>
        );
    }
}
export default Gmap;