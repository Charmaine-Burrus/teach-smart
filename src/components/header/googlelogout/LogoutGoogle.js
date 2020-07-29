import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';

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
                />
            </div>
        );
    }
}

export default LogoutGoogle;