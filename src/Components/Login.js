import React, { Component } from 'react';
import validator from 'validator'
import axios from 'axios'

class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        };
        this.login = this.login.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }
    login() {
        // console.log('username: ', this.state.username);
        // console.log('password: ', this.state.password);
        const request = {
            email: this.state.username,
            password: this.state.password
        };
        axios.post('http://localhost:4000/login', (request), { withCredentials: true }).then(res => {
            // alert('Logged in')
            console.log(res);
            // if(this.props.Admin){
            //     window.location.pathname = '/';
            // }else{

                window.location.pathname = '/home';
            // }
        }).catch(error => {
            // console.log('Error: ', error);
            this.setState({
                errorMessage: 'Invalid! email OR password'
            });
        });
    }
    updateUsername(evt) {
        this.setState({
            username: evt.target.value
        });
    }
    updatePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }
    render() {
        return (
            <div className="container">
                <h2>Login page</h2>
                <div className="row my-2 mt-5">
                    <div className="col-sm">
                        <input type="text" value={this.state.username} onChange={this.updateUsername} className="form-control" placeholder="Email Id" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="password" value={this.state.password} onChange={this.updatePassword} className="form-control" placeholder="Password" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col text-right">
                        <button className="btn btn-sm btn-success" onClick={this.login}>Log In</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default login;