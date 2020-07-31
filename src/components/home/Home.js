import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import growth from '../../images/growth.jpg';
import assessment from '../../images/assessment.jpg';
import graph3 from '../../images/graph3.jpg';
import Axios from 'axios';
import AddPopup from './addpopup/AddPopup';
import style from '../../index.css';

class Home extends Component {

    constructor() {
        super();
        this.state = {
          showPopup: false
        };
      }

    togglePopup=() => {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }

    listCourses=(e)=>{
        const params = {
            authToken: localStorage.getItem('authToken')
        }
        e.preventDefault();
        console.log("test check")
        Axios.get('http://localhost:4000/listCourses', {params})
        .then(response => {
            console.log(response.data);
            this.togglePopup();
        }).catch( error => {
            console.log(error);
        });
      }

      navigateToAnalysis=()=>{
        this.props.history.push('/analysis')
      }

    render() {
        return (
            <div className="home">
                <div className="container-fluid padding home-container">
                    <div className="row center">
                        <div className="col-md-3 center"></div>
                    
                        <a className="col-md-3 center" href="#" onClick={(e) => this.listCourses(e)}>
                            <div className="card">
                                <img src={assessment} className="card-img-top card-pics" alt="Assessment"/>
                                <div className="card-body">
                                    <h5 className="card-title">Add Assessment</h5>
                                    <p className="card-text">Import from Google Forms.</p>
                                </div>
                            </div>
                        </a>
                        
                        <a className="col-md-3 center" href="#" onClick={this.navigateToAnalysis}>
                            <div className="card">
                                <img src={graph3} className="card-img-top card-pics" alt="Growth"/>
                                <div className="card-body">
                                    <h5 className="card-title">Analyze Assessment</h5>
                                    <p className="card-text">View assessment data analysis.</p>
                                </div>
                            </div>
                        </a>  

                        <div className="col-md-3 center"></div>  

                    </div>
                </div>
                {this.state.showPopup ? 
                    <AddPopup
                        text='Close Me'
                        closePopup={this.togglePopup.bind(this)}
                        {...this.props}
                    />
                    : null
                }
            </div>
        );
    }
}

export default Home;