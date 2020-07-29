import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LogoutGoogle from './googlelogout/LogoutGoogle';
import TeachSmart from '../../images/TeachSmart.jpg';

class Header extends Component {

    render() {

        let links = (
            <li className="nav-item active">
                <Link className="nav-link" to="/about-us">About Us <span className="sr-only">(current)</span></Link>
            </li>
        );
        
        let signInSignOut = (
            <a className="navbar-brand" href="/"><img src={TeachSmart} className="mini-logo"/></a>
        )

        if(localStorage.getItem("loggedInUser")) {
            signInSignOut = (
                <LogoutGoogle/>
            )

            links = (
                //TO DO: this probably won't look right.. i need to figure out how to get rid of div but still have a "parent element" OR do this all w/ separate components instead and pass props
                <div>
                    <li className="nav-item active">
                        <a className="navbar-brand" href="/"><img src={TeachSmart} className="mini-logo"/></a>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/about-us">About Us <span className="sr-only">(current)</span></Link>
                    </li>
                </div>
            )
        }

        return (
            //header is Hiram's suggestion, header-bottom is from Lamar, maybe bootstrap
            <div className="header">
                {/* might want to add fixed-top for scrolling */}
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