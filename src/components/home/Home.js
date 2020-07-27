import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import growth from './growth.jpg';
import assessment from './assessment.jpg';
import Axios from 'axios';

class Home extends Component {

    //might be able to make this a dumb component instead...

    render() {
        return (
            <div className="home">
                <div className="container-fluid padding">
                    <div className="row center">

                        <a className="col-md-4 center" href="#">
                            <div className="card">
                                <img src={assessment} className="card-img-top card-pics" alt="Assessment"/>
                                <div className="card-body">
                                    <h5 className="card-title">Add Assessment</h5>
                                    <p className="card-text">Import an assessment from Google Forms.</p>
                                </div>
                            </div>
                        </a>

                        <a className="col-md-4 center" href="#">
                            <div className="card">
                                <img src={growth} className="card-img-top card-pics" alt="Growth"/>
                                <div className="card-body">
                                    <h5 className="card-title">Analyze Assessment</h5>
                                    <p className="card-text">View assessment data analysis.</p>
                                </div>
                            </div>
                        </a>    

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;