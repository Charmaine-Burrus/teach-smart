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
            assignment : {
                accessToken: '',
                responseUrl: '',
                //TODO: choose to have either this or the selected file field below
                csv: ''
            },
            showModal2: false,
            selectedFile: null,
            assignmentName: ''
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
        Axios.post('http://localhost:4000/listAssignments', tSClass)
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
        const tempAssignment = {...this.state.assignment};
        tempAssignment["accessToken"] = localStorage.getItem('accessToken');
        tempAssignment["responseUrl"] = event.target.value;
        console.log(tempAssignment);
        this.setState(
            {
                assignment : tempAssignment
            }
        );
        /* Still not positive if it's being set above... if not, could use this
        this.state.assignment["accessToken"] = localStorage.getItem('accessToken');
        this.state.assignment["assignmentName"] = event.target.name;
        this.state.assignment["responseUrl"] = event.target.value;
        console.log(this.state.assignment); */
        this.handleModal2();
    }

    onFileChange = event => {  
        this.setState({ selectedFile: event.target.files[0] });     
    }; 

    onNameChange = event => {  
        this.setState({ assignmentName: event.target.value });     
    }; 

    //not sure about this one either... trying to send the assignment that I set above
    addAssignmentResults=(e)=>{
        e.preventDefault();
        //OR i could do like I did in setAssignment results and copy the state object and modify some values
        const formData = new FormData()
        formData.append("file",this.state.selectedFile)
        const tSAssignment = {
            accessToken: this.state.assignment.accessToken,
            //This needs to be input from user
            assignmentName: this.state.assignmentName,
            responseUrl: this.state.assignment.responseUrl,
            file: formData
            //could add back other info here potentially...
        };
        console.log(tSAssignment);
        // IT IS BETTER IF I CAN SEND THE TSASSIGNMENT TOO (W/O FORM) -- WILL NEED TO SEND LOGGED IN USER AS WELL
        Axios.post('http://localhost:8080/addAssignmentResults', formData, {headers: {"Content-Type": "multipart/form-data"}})
        .then(response => {
          console.log(response.data);
          //TODO: remove this -- it was just a test
          localStorage.setItem("assignmentFromDatabase", response.data.assignmentName);
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
                    
                        <div className="col-md-3 center">
                            <a href="#" onClick={(e) => this.listCourses(e)}>
                                <div className="card center">
                                    <img src={assessment} className="card-img-top" alt="Assessment"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Add Assessment</h5>
                                        <p className="card-text">Import from Google Forms.</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        
                        <div className="col-md-3 center">
                            <a href="#" onClick={()=>{this.navigateToAnalysis()}}>
                                <div className="card center">
                                    <img src={graph3} className="card-img-top" alt="Growth"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Analyze Assessment</h5>
                                        <p className="card-text">View assessment data analysis.</p>
                                    </div>
                                </div>
                            </a>  
                        </div> 

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
                                <select className="form-control" value="" onChange={this.setAssignmentResults}>
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
                            <div className="padding">
                                Step 5: Name this Assignment
                                <input onChange={this.onNameChange} value = {this.state.assignmentName} placeholder ="Assignment Name"  /> 
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
                        <p>{this.state.assignment.responseUrl}</p>
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