import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LogoutGoogle from './googlelogout/LogoutGoogle';
import TeachSmartLogoWhite from '../../images/TeachSmartLogoWhite.png';
import './header.css';

class Header extends Component {

    render() {

        let links = (
            <li className="nav-item active">
                <Link className="nav-link" to="/about-us">About Us <span className="sr-only">(current)</span></Link>
            </li>
        );
        
        let signInSignOut = (
            <a className="navbar-brand" href="/"><img src={TeachSmartLogoWhite} className="mini-logo"/></a>
        )

        if(localStorage.getItem("loggedInUser")) {
            signInSignOut = (
                <LogoutGoogle {...this.props}/>
            )

            links = (
                <div>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/about-us">About Us <span className="sr-only">(current)</span></Link>
                    </li>
                </div>
            )
        }

        return (
            <div className="header">
                <nav className="navbar navbar-dark navbar-expand-md">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            {links}
                        </ul>
                        <span className="navbar-right">{signInSignOut}</span>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;