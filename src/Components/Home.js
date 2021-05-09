import React, { Component } from 'react';
// import './App.css';
import axios from 'axios'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: null,
            lng: null,
            coordinates: [],
            userId: '',
            startDate: '',
            id: '',
        }
        this.getLocation = this.getLocation.bind(this);
        this.getcoordinates = this.getcoordinates.bind(this);
        this.saveLocation = this.saveLocation.bind(this)
        this.logout = this.logout.bind(this)
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
        const lastLatLng = {
            lat: lat,
            lng: lng
        };
        localStorage.setItem("lastLatLong", JSON.stringify(lastLatLng));
        if (id === null) {
            axios.post('https://cryptic-atoll-97983.herokuapp.com/location', (request), { withCredentials: true }).then(res => {
                localStorage.setItem("id", res.data.id);
            });
        } else {
            axios.patch('https://cryptic-atoll-97983.herokuapp.com/location/' + id, request, { withCredentials: true }).then(res => {
            });
        }
    }
    logout() {
        const lastLatLong = (localStorage.getItem("lastLatLong") && JSON.parse(localStorage.getItem("lastLatLong"))) || {};
        const id = localStorage.getItem("id");
        axios.patch('https://cryptic-atoll-97983.herokuapp.com/location/' + id, lastLatLong, { withCredentials: true }).then(res => {
            localStorage.removeItem("id");
            localStorage.removeItem("lastLatLong")
        }).catch((error) => {
            // alert(error);
        })

    }

    render() {
        return (
            <div className="container">
                <button className="btn btn-primary my-5 mr-5" onClick={this.getLocation}>Start</button>
                <button className="btn btn-danger my-5" onClick={this.logout}>End</button>
            </div>
        );
    }
}
export default Home;