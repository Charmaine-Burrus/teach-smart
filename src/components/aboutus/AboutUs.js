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

            <h1 className="white-text-black-border top-padding">-Our Mission-</h1>
            <h4 className="thick-text-white-border">Design tools that empower teachers to work as smart as possible, propelling their students to success!</h4>
            
            <h1 className="white-text-black-border top-padding">-Our Model-</h1>
            <h4 className="thick-text-white-border">You already work hard. We give you the tools to work smart.</h4>
            <h4 className="thick-text">Data-informed instruction has never been easier!</h4>
            
            <div className="row full-padding">
                
                <div className="col-md-4">
                    <div className="card center">
                        <img className="card-img-top" src={graph2}/>
                        <div className="card-body">
                            <h4 className="card-title thick-text">Plan</h4>
                            {/* <p className="card-text">Upload assignment data directly from Google. Use our analysis to guide your future instruction.</p> */}
                            <p className="card-text">Upload assignment data from Google. Use our analysis to guide your instruction.</p>
                        </div>
                    </div>
                </div>	

                
                <div className="col-md-4">
                    <div className="card center">
                        <img className="card-img-top" src={brainstorming}/>
                        <div className="card-body">
                            <h4 className="card-title thick-text">Share</h4>
                            <p className="card-text">Share results with students, while keeping individual scores anonymous.</p>
                        </div>
                    </div>
                </div>	

                
                <div className="col-md-4">
                    <div className="card center">
                        <img className="card-img-top" src={grad}/>
                        <div className="card-body">
                            <h4 className="card-title thick-text">Succeed!</h4>
                            {/* <p className="card-text">Empower all students to improve with each assignment. Lead your team to exceed state standards.</p> */}
                            <p className="card-text">Empower students to improve with each assignment - exceed state standards.</p>
                        </div>
                    </div>
                </div>	

            </div>
        </div>    
    </div>
    );
}

export default AboutUs;