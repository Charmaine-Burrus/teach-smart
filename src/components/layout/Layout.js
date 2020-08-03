import React, { Component } from 'react';
import Signup from '../signup/SignUp';
import Header from '../header/Header';
import AboutUs from '../aboutus/AboutUs';
import Home from '../home/Home';
import Analysis from './../analysis/Analysis';

// we needed to add this in order to specify the routes below
import {Route, withRouter} from 'react-router-dom';

// Layout is our container for the header and sign up
class Layout extends Component {
    render() {

        // we only allow users to view certain routes based on their signin status
        let routes = (
            //not logged in we need a container to hold everything in
            <div>
                {/* component is the thing it will go to... and path is what the browser will so... so if this is the default if the user types nothing in the browser or types sign-up */}
                <Route component={Signup} path="/" exact {...this.props}/>
                <Route component={Signup} path="/sign-up" {...this.props}/>
                {/* TODO: need to remove this */}
                <Route component={Analysis} path="/analysis" exact {...this.props}/>
            </div>
        );

        if(localStorage.getItem("loggedInUser")) {
            routes = (
                //logged in
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
                {/* component is the thing it will go to... and path is what the browser will so... so if this is the default if the user types nothing in the browser or types sign-up */}
                {routes}
                <Route component={AboutUs} path="/about-us" />
            </div>
        );
    }
}

//we needed to modify this when we added the router too
export default withRouter(Layout);