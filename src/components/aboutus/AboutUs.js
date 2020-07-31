import React from 'react';

import style from './about.css'
import graph2 from '../../images/graph2.jpg';
import brainstorming from '../../images/brainstorming.jpg';
import grad from '../../images/grad.jpg';
import Wallpaper from '../../images/wallpaper.jpg';

const AboutUs = () => {
    return ( 
    <div className="about-us .about-us-container text-center cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

        <div role="main" className="inner cover">

            <h2 className="cover-heading padding">-Our Mission-</h2>
            <p className="lead">Design tools that empower teachers to work as smart as possible, propelling their students to success!</p>
            
            <h2 className="cover-heading padding">-Our Model-</h2>
            <p className="lead">You already work hard. We give you the tools to work smart.</p>
            <h5 >Data-informed instruction has never been easier!</h5>
            
            <div className="row padding">
                
                <div className="col-md-4">
                    <div className="card center">
                        <img className="card-img-top" src={graph2}/>
                        <div className="card-body">
                            <h4 className="card-title">Plan</h4>
                            <p className="card-text">...</p>
                        </div>
                    </div>
                </div>	

                
                <div className="col-md-4">
                    <div className="card center">
                        <img className="card-img-top" src={brainstorming}/>
                        <div className="card-body">
                            <h4 className="card-title">Share</h4>
                            <p className="card-text">...</p>
                        </div>
                    </div>
                </div>	

                
                <div className="col-md-4">
                    <div className="card center">
                        <img className="card-img-top" src={grad}/>
                        <div className="card-body">
                            <h4 className="card-title">Succeed</h4>
                            <p className="card-text">...</p>
                        </div>
                    </div>
                </div>	

            </div>
        </div>    
    </div>
    );
}

export default AboutUs;