import React, { Component } from 'react';
import Axios from 'axios';

import {Link} from 'react-router-dom';

class Header extends Component {

    state = {
        user : {
            email: '',
            password: ''
        }
    }

    //sending stuff to our backend using the Axios library.. triggered by LogIn button
    handleSubmit = () => {
        Axios.post('http://localhost:4000/login', this.state.user)
        // .then shows that it's an asynchronous call
        .then(response => {
            //response will return an entire user.. now we need to store the user data in localStorage (tied to the browser, like a session)... similar to cookies
            localStorage.setItem("loggedInUser", response.data.email)
            //navigate to Home page
            this.props.history.push('/home');
        }).catch( error => {
            //TODO: display error message to the user
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempUser = {...this.state.user};
        //this updates "name" field of tempUser... this is a shortcut
        tempUser[name] = value;
        this.setState(
            {
                user: tempUser
            }
        );
    }

    signOut = () => {
        //remove user from "session"
        localStorage.removeItem("loggedInUser");
        //navigate to Home page
        this.props.history.push('/home');
    }

    render() {

        let links = (
            <li className="nav-item active">
                <Link className="nav-link" to="/sign-up">Sign Up <span className="sr-only">(current)</span></Link>
            </li>
        );

        let signInSignOut = (
            <form className="form-inline mt-2 mt-md-0">
                <input onChange={this.handleChange} value={this.state.email} name="email" className="form-control mr-sm-2" type="text" placeholder="Email" aria-label="Email"/>
                {/* type = password will show astriks as you type in */}
                <input onChange={this.handleChange} value={this.state.password} name="password"className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password"/>
                {/* type="button", b/c type="submit" wants to submit a form */}
                <button onClick={this.handleSubmit} className="btn my-2 my-sm-0" type="button">Sign In</button>
                </form>
        );
        if(localStorage.getItem("loggedInUser")) {
            signInSignOut = (
                <button onClick={this.signOut} className="btn my-2 my-sm-0" type="button">Sign Out</button>
            )

            links = (
                <li className="nav-item active">
                    <Link className="nav-link" to="/settings">Settings <span className="sr-only">(current)</span></Link>
                </li>
            )
        }

        return (
            //header is Hiram's suggestion, header-bottom is from Lamar, maybe bootstrap
            <div className="header">
                {/* might want to add fixed-top for scrolling */}
                <nav className="navbar navbar-dark navbar-expand-md">
                    <Link className="navbar-brand" to="/">Dashboard</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            {/* //this will be either settings or sign up dependin on login status */}
                            {links}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about-us">About Us</Link>
                            </li>
                        </ul>
                        {signInSignOut}
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;