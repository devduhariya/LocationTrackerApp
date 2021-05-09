import axios from 'axios';
import React, { Component } from 'react'
import Table from './Table';
import Map2 from './Map2'
import '../App.css'
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

    handleuserId(record) {
        // console.log('childid  ', record);
        // this.getUser(childId)
        this.setState({
            oneUser: record,
        });

    }
    checkLogin() {
        // console.log('in chk login');
        axios.get('https://cryptic-atoll-97983.herokuapp.com/session', { withCredentials: true }).then(res => {
            // console.log('res: session in adminmain', res);
            if (res.data.session && res.data.session.userId) {
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
        axios.get('https://cryptic-atoll-97983.herokuapp.com/users', { withCredentials: true }).then(res => {
            // console.log("users", res);
            const usrs = this.groupBy(res.data, "userId");
            // console.log("usrs: group by: ", usrs);
            this.setState({
                usersRecord: usrs,
                oneUser: usrs[0][usrs[0].length-3],
            });
        }).catch(error => {
            // console.log('Error: ', error);
            this.setState({
                errorMessage: 'No data available'
            });
        });
        // this.checkLogin = this.checkLogin.bind(this);
    }
     groupBy(collection, property) {
        var i = 0, val, index,
            values = [], result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    }
    getUser(id) {
        axios.get('https://cryptic-atoll-97983.herokuapp.com/user/' + id, { withCredentials: true }).then(res => {
            this.setState({
                oneUser: res.data,
            });
        }).catch(error => {
            // console.log('Error: ', error);
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
                { 
                this.state.isAdmin ? (
                    <>
                        <Table users={this.state.usersRecord} handleChange={this.handleuserId} />
                        {this.state.oneUser ? (
                            <>  
                                <Map2 userData={this.state.oneUser} />
                            </>) : <h2>Loading</h2>}
                    </>

                ) :
                    <h1 className='errorMessage'><span><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                  </svg></span>404 Page Not Found</h1>

                }
            </div>
        )
    }
}
