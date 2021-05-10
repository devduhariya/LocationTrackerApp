import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        };
        this.signup = this.signup.bind(this);
        this.updateuserName = this.updateuserName.bind(this);
        this.updateUserEmail = this.updateUserEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }
    signup() {
        // console.log('first: ', this.state.userName);
        // console.log('email: ', this.state.email);
        // console.log('newPass: ', this.state.password);
        // console.log('conPass: ', this.state.confirmPassword);
        const req = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        };
        axios.post('https://locationtrackappback.herokuapp.com/signup', req,{ withCredentials: true }).then(res => {
            // console.log('res:', res);
            // alert('succes');
            this.props.history.push('/admin/dashboard');
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Invalid! crendintials'
            });
        });

    }
    updateuserName(evt) {
        this.setState({
            userName: evt.target.value
        });
    }
    updateUserEmail(evt) {
        this.setState({
            email: evt.target.value
        });
    }

    updatePassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }
    updateConfirmPassword(evt) {
        this.setState({
            confirmPassword: evt.target.value
        });
    }
    checkPassword() {
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        if (password && (password === confirmPassword)) {
            return true;
        } else {
            alert('password and confirm is not matched');
            return false;
        }
    }
    render() {
        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Add User</h2>
                {this.props.error ? <div className="error">{this.props.error}</div> : null}
                <div className="row my-2">
                    <div className="col-sm">
                        <input type="text" value={this.state.userName} onChange={this.updateuserName} className="form-control" placeholder="User Name" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-sm">
                        <input type="email" value={this.state.email} onChange={this.updateUserEmail} className="form-control" placeholder="E-mail id" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="password" value={this.state.password} onChange={this.updatePassword} className="form-control" placeholder="New Password" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="password" value={this.state.confirmPassword} onChange={this.updateConfirmPassword} className="form-control" placeholder="Confirm Password" onBlur={this.checkPassword} />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col text-right">
                        <button className="btn btn-sm btn-success mr-3" onClick={this.signup}> Add User</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Registration;