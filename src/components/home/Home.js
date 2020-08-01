import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import growth from '../../images/growth.jpg';
import assessment from '../../images/assessment.jpg';
import graph3 from '../../images/graph3.jpg';
import Axios from 'axios';
import AddPopup from './addpopup/AddPopup';
import style from '../../index.css';
import {Button, Form, Modal} from 'react-bootstrap';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            show: false
        }
    }

    handleModal() {
        this.setState({show: !this.state.show})
    }

    navigateToAnalysis() {
        this.props.history.push('/analysis')
    }

    listCourses=(e)=>{
        const authToken = {
            googleTokenId: localStorage.getItem('accessToken')
        };
        e.preventDefault();
        console.log("test check.. params are" + authToken);
        Axios.post('http://localhost:4000/listCourses', { googleTokenId: localStorage.getItem('accessToken')} )
        .then(response => {
            console.log(response.data);
            //this is where i should set state using the response
            this.handleModal();
        }).catch( error => {
            console.log(error);
        });
      }

    addAssignmentResults=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:4000/addAssignmentResults')
        .then(response => {
          console.log(response.data);
          this.props.history.push('/analysis');
        }).catch( error => {
          console.log(error);
        });
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
                        
                        <a className="col-md-3 center" href="#" onClick={()=>{this.navigateToAnalysis()}}>
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
                <Modal
                    show={this.state.show}
                    onHide={()=>{this.handleModal()}}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add an Assessment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div>
                                Select a Course
                                {/* this actually doesn't need to be sent to the backend in a form */}
                                <select className="form-control" onChange={this.getAssignments} name="course" id="course">
                                    {/* I need to list these dynamically from what /listCourses returned */}
                                    <option value="John White">Example Course</option>
                                </select>
                            </div>
                            <div>  
                                <select className="form-control" onChange={this.getAssignments} name="course" id="course">
                                    {/* now i list what i get back from /list assignments */}
                                    <option value="John White">Example Course</option>
                                </select>
                            </div>  
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{this.handleModal()}}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={(e) => this.addAssignmentResults(e)}> Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Home;