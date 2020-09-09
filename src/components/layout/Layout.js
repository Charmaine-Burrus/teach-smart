import React, { Component } from 'react';
import Signup from '../signup/SignUp';
import Header from '../header/Header';
import AboutUs from '../aboutus/AboutUs';
import Home from '../home/Home';
import Analysis from './../analysis/Analysis';
import {Route, withRouter} from 'react-router-dom';

class Layout extends Component {
    render() {

        //default is not logged in
        let routes = (
            <div>
                <Route component={Signup} path="/" exact {...this.props}/>
                <Route component={Signup} path="/sign-up" {...this.props}/>
            </div>
        );

        if(localStorage.getItem("loggedInUser")) {
            routes = (
                <div>
                    <Route component={Home} path="/home" {...this.props}/>
                    <Route component={Home} path="/" exact {...this.props}/>
                    <Route component={Analysis} path="/analysis" exact {...this.props}/>
                </div>
            );
        }

        return (
            <div>
                {/* props of layout are now props of header so has access to browser history */}
                <Header {...this.props}/>
                {routes}
                <Route component={AboutUs} path="/about-us" />
            </div>
        );
    }
}

export default withRouter(Layout);