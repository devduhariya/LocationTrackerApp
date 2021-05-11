import React, { Component } from 'react';
import validator from 'validator'
import axios from 'axios'

class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
        this.login = this.login.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        // this.checkSession = this.checkSession.bind(this);
    }
    login() {
        const request = {
            email: this.state.username,
            password: this.state.password
        };
        axios.post('https://locationtrackappback.herokuapp.com/login', (request), { withCredentials: true }).then(res => {
            // this.checkSession();
            this.props.history.push('/home');
            window.location.reload(false);
            // this.props.history.reload();
        }).catch(error => {
            this.setState({
                errorMessage: 'Invalid! email OR password',
            });
            // alert(this.state.errorMessage)
        });
    }
    // checkSession() {
    //     axios.get('https://locationtrackappback.herokuapp.com/session', { withCredentials: true }).then(res => {
    //         if (res.data.session.role === 'admin') {
    //             this.props.history.push('/admin/dashboard');
    //         } else {
    //             this.props.history.push('/home');
    //         }
    //     });
    // }
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
                <h2 className="mt-5 text-center">Login page</h2>
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
                        <button className="btn btn-success" onClick={this.login}>Log In</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default login;