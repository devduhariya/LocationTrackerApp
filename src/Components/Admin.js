import axios from 'axios';
import React, { Component } from 'react'
import Table from './Table';
import Login from './Login'
import Map from './Map';
export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usersRecord: [],
            isAdmin: false,
            isloggedin: false,
            id: '',
            oneUser: ''
        }
        this.handleuserId = this.handleuserId.bind(this)
    }

    handleuserId(childId) {
        console.log('childid  ', childId);
        this.getUser(childId)

    }
    checkLogin() {
        console.log('in chk login');
        axios.get('http://localhost:4000/session', { withCredentials: true }).then(res => {
            console.log('res: session', res);
            if (res.data.session && res.data.session.userEmail) {
                this.setState({
                    isAdmin: false,
                    isloggedin: true
                });
            }
            if (res.data.session.role === 'admin') {
                this.setState({
                    isAdmin: true,
                    isloggedin: true
                });
            }
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                isAdmin: false,
                isloggedin: false
            });
        });
    }
    getUsers() {
        axios.get('http://localhost:4000/users', { withCredentials: true }).then(res => {
            console.log("users", res);
            this.setState({
                usersRecord: res.data,
                oneUser: res.data[0],
            });
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'No data available'
            });
        });
        // this.checkLogin = this.checkLogin.bind(this);
    }
    getUser(id) {
        // const id = params.id;
        axios.get('http://localhost:4000/user/' + id, { withCredentials: true }).then(res => {
            console.log("userone  ", res);
            this.setState({
                oneUser: res.data,
            });
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'No user available'
            });
        });
    }

    componentDidMount() {
        this.checkLogin()
        this.getUsers();
    }

    render() {
        return (
            <div>
                {this.state.isloggedin && this.state.isAdmin ? (
                    <>
                        <Table users={this.state.usersRecord} handleChange={this.handleuserId} />
                        {this.state.oneUser ? (
                            <>
                                {console.log('this.state.oneUser: ', this.state.oneUser)}
                                <Map userData={this.state.oneUser} />
                                {/* <MapRoute userData={userData} /> */}
                            </>) : <h2>Loading</h2>}
                    </>

                ) :
                    <Login />

                }
            </div>
        )
    }
}
