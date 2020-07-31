import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';
import TeachSmart from '../../../images/TeachSmart.jpg';

class LogoutGoogle extends Component {

    logout = () => {
        //remove user from "session"
        localStorage.removeItem("loggedInUser");
        //navigate to Home page
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <GoogleLogout
                    clientId="859167518630-2vfc35jchg1lndfmto5jolrvtsvf1kae.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                >
                </GoogleLogout>
                <img src={localStorage.getItem("profilePic")} className="profile-pic" alt="profile-pic"/>
                {/* <img src={JSON.parse(localStorage.getItem("loggedInUser"))} className="profile-pic"/> */}
                <a href="/"><img src={TeachSmart} className="mini-logo" alt="TeachSmart"/></a>
            </div>
        );
    }
}

export default LogoutGoogle;