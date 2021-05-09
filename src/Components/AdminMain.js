import React, { Component } from 'react';
import axios from 'axios'
class AdminMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isloggedin: false
        }
        this.logout = this.logout.bind(this)
        this.checkLogin = this.checkLogin.bind(this)
    }

    checkLogin() {
        axios.get('https://cryptic-atoll-97983.herokuapp.com/session', { withCredentials: true }).then(res => {
            console.log('res: session', res);
            if (res.data.session && res.data.session.userEmail) {
                this.setState({
                    isloggedin: true
                });
            }
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                isloggedin: false
            });
        });
        console.log('islogged in', this.state.isloggedin);
    }
    logout() {
        axios.get('https://cryptic-atoll-97983.herokuapp.com/logout', { withCredentials: true }).then((res) => {
            localStorage.removeItem("id");
            window.location.pathname = '/'
        }).catch((error) => {
            alert(error);
        })
    }
    componentDidMount() {
        this.checkLogin();
    }
    render() {
        console.log('sesion log in', this.state.isloggedin);
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <img className="shadow-sm bg-white rounded mr-3"
                            src="data:image/jpeg;base64,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"
                            alt="Location tracker"
                            height="40" />
                        <a className="navbar-brand" href="/">Location App</a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">


                                {
                                    this.state.isloggedin ? (
                                        <>
                                            <li className="nav-item ml-3" >
                                                <button className="nav-link btn-info btn"
                                                    onClick={() => { window.location.pathname = '/admin/dashboard' }} >Admin </button>
                                            </li>
                                            <li className="nav-item ml-3" >
                                                <button className="nav-link btn-info btn"
                                                    onClick={() => { window.location.pathname = '/home' }} >Home </button>
                                            </li>
                                            <li className="nav-item ml-3" >
                                                <button className="nav-link btn-danger btn"
                                                    onClick={this.logout} > Logout </button>
                                            </li>
                                        </>

                                    ) :
                                        <li className="nav-item ml-3" >
                                            <button className="nav-link btn-primary btn"
                                                onClick={() => { window.location.pathname = '/' }} >Log in </button>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default AdminMain;