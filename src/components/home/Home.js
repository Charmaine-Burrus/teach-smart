import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import growth from '../../images/growth.jpg';
import assessment from '../../images/assessment.jpg';
import graph3 from '../../images/graph3.jpg';
import Axios from 'axios';
import style from './home.css'
import {Button, Form, Modal} from 'react-bootstrap';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            show: false,
            courses: [],
            assessments: []
        }
    }

    handleModal() {
        this.setState({show: !this.state.show})
    }

    listAssignments = (event) => {
        //now need to write something similar to .listCourses but .listAssignments and send this value to backend  (remember only those with a sheet)
        console.log(event.target.value);
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
            //I've received an array of courses
            this.setState({courses: response.data})
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
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add an Assessment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="padding">
                                Step 1: Select a Course
                                {/* this actually doesn't need to be sent to the backend in a form */}
                                <select className="form-control" onChange={this.listAssignments} name="course" id="course">
                                    {/* I need to list these dynamically from what /listCourses returned */}
                                    {this.state.courses.map((course, index) =>
                                    <option value={course.id}>{course.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="padding"> 
                                Step 2: Choose an Assignment
                                <select className="form-control" onChange={this.setAssignmentResults} name="assignment" id="assignment">
                                    {/* now i list what i get back from /list assignments */}
                                    <option value="John White">Example Assignment 1</option>
                                    <option value="John White">Example Assignment 2</option>
                                    <option value="John White">Example Assignment 3</option>
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