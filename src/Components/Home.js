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
            // endDate: ''
        }
        this.getLocation = this.getLocation.bind(this);
        this.getcoordinates = this.getcoordinates.bind(this);
        this.saveLocation = this.saveLocation.bind(this)
        // this.getEndLocation = this.getEndLocation.bind(this);
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
        // var options = { enableHighAccuracy: false, timeout:60000, maximumAge: 0 };
        this.saveLocation(position.coords.latitude, position.coords.longitude);
        // this.setState({
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        // });
    }
    saveLocation(lat, lng) {
        const request = {
            lat: lat,
            lng: lng
        };
        const id = localStorage.getItem("id");
        // console.log('local storage id: ', id);
        const lastLatLng = {
            lat: lat,
            lng: lng
        };
        localStorage.setItem("lastLatLong", JSON.stringify(lastLatLng));
        if (id === null) {
            axios.post('http://localhost:4000/location', (request), { withCredentials: true }).then(res => {
                localStorage.setItem("id", res.data.id);
                // console.log('res.data.id: ',res.data.id);
            });
        } else {
            axios.patch('http://localhost:4000/location/' + id, request, { withCredentials: true }).then(res => {
            });
        }
    }

    logout() {
        // const request = {
        //     lat: lat,
        //     lng: lng,
        //     endDate: new Date()
        // };
        const lastLatLong = (localStorage.getItem("lastLatLong") && JSON.parse(localStorage.getItem("lastLatLong"))) || {};

        // lastLatLong['endDate'] = new Date();

        // axios.get('http://localhost:4000/logout', { withCredentials: true }).then((res) => {
        const id = localStorage.getItem("id");
        // console.log("lastLatLong: ", lastLatLong);
        axios.patch('http://localhost:4000/location/' + id, lastLatLong, { withCredentials: true }).then(res => {
            // console.log('res in END: ', res);
            // });
            localStorage.removeItem("id");
            localStorage.removeItem("lastLatLong")
            // this.props.history.push('/');
        }).catch((error) => {
            alert(error);
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