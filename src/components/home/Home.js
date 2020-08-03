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
            course: '',
            assignments: [],
            assignment: '',
            assignmentUrl: '',
            showModal2: false,
            selectedFile: null
        }
    }

    handleModal() {
        this.setState({show: !this.state.show})
    }

    handleModal2() {
        this.setState({showModal2: !this.state.showModal2})
    }

    navigateToAnalysis() {
        this.props.history.push('/analysis')
    }

    listCourses=(e)=>{
        const authToken = {
            googleTokenId: localStorage.getItem('accessToken')
        };
        e.preventDefault();
        console.log("test check.. params are", authToken);
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

      listAssignments = (event) => {
        this.setState({assignments: []})
        console.log(event.target.value);
        this.setState({course: event.target.value})
        const tSClass = {
            accessToken: localStorage.getItem('accessToken'),
            classId: event.target.value
        };
        Axios.post('http://localhost:4000/listAssignmentsWithSheet', tSClass)
        .then(response => {
            console.log("ASsignments ::> ", response.data);
            if(response.data != undefined && response.data.length > 0){
                const assignments = response.data
                    .filter( assigment => {
                        if(assigment.materials != undefined && assigment.materials.length > 0){
                            return assigment.materials
                                .filter( material => {
                                    return material != undefined && material.form != undefined && material.form.responseUrl != undefined
                                }).length > 0
                        }
                        return false;
                    })
                console.log("Filtered assignments ::> ", assignments)
                //I've received an array of assignments
                this.setState({assignments: assignments})
            }else{
                // this.setState({assignments: []})
            }
        }).catch( error => {
            console.log(error);
        });
    }

    //not sure how to write this... I want to update state.assignment to assignments(index)... I've saved that as the value of the option
    setAssignmentResults = (event) => {
        console.log(event.target.value);
        this.setState({assignmentUrl: event.target.value})
/*         this.setState({
            assignment : this.state.assignments[event.target.value]
        }) */
        // TODO: If this doesn't work, I could just make a bunch of fields in state that correspond to the ones in addAssignment below and set them all here
       /*  this.setState({
            assignmentUrl : this.state.assignment.materials[0].form.responseUrl
        }) */
        this.handleModal2();
    }

    onFileChange = event => {  
        this.setState({ selectedFile: event.target.files[0] });     
    }; 

    //not sure about this one either... trying to send the assignment that I set above
    addAssignmentResults=(e)=>{
        e.preventDefault();
        const tSAssignment = {
            accessToken: localStorage.getItem('accessToken'),
            assignmentName: this.state.assignment.title,
            responseUrl: this.state.assignment.materials[0].form.responseUrl,
            formPictureUrl: this.state.assignment.materials[0].form.thumbnailUrl,
            csv: this.state.selectedFile
            //could add back other info here potentially...
        };
        console.log(tSAssignment);
        Axios.post('http://localhost:4000/addAssignmentResults', tSAssignment)
        .then(response => {
            //do i need to close the modal here?
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
                                <select className="form-control" value={this.state.course} onChange={this.listAssignments}>
                                    <option value="" disabled>Please Select a value</option>
                                    {this.state.courses.map((course, index) =>
                                    <option key={index} value={course.id}>{course.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="padding"> 
                                Step 2: Choose an Assignment
                                {/* I  might not want to bind the value here... not sure */}
                                <select className="form-control" value={this.state.assignment} onChange={this.setAssignmentResults}>
                                    <option value="" disabled>Please Select an Assignment</option>
                                    {this.state.assignments.map((assignment, index) =>
                                    // TODO: need to figure out how to do it with index... before i had value=index... idk, look into that
                                    <option key={index} value={assignment.materials[0].form.responseUrl}>{assignment.title}</option>
                                    )}
                                </select>
                            </div>  
                            <div className="padding">
                                Step 4: Upload the File Downloaded During Step 3
                                <input type="file" onChange={this.onFileChange} /> 
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
                <Modal
                    className={"modal"}
                    show={this.state.showModal2}
                    onHide={()=>{this.handleModal2()}}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Step 3: Access the Google Sheet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your sheet is located here:</p>
                        <p>{this.state.assignmentUrl}</p>
                        <p>Copy the link and paste it into a new tab -- this will open the sheet.</p>
                        <p>Go to File -> Download -> Tab-separated values.</p>
                        <p>Now close this box and proceed to Step 4.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{this.handleModal2()}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Home;