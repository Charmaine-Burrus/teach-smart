import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button, Form} from 'react-bootstrap';
import Axios from 'axios';

class AddPopup extends Component {

    state = {
        
    }

/*     const [show, setShow] = useState(true);
  
    handleClose = () => setShow(false);
    handleShow = () => setShow(true); */

    constructor() {
        super();
        this.state = {
          showPopup: false
        };
      }

    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }

    getAssignments=() => {

    }

    addAssignmentResults=()=>{
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
            <div>
                <Modal
                    /* show={show}
                    onHide={handleClose} */
                    backdrop="static"
                    keyboard={false}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Add an Assessment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* can i use a spring form and would there be a benefit to that? */}
                        <Form>
                            <div>
                                Select a Course
                                {/* this actually doesn't need to be sent to the backend in a form */}
                                <select class="form-control" onChange={this.getAssignments} name="course" id="course">
                                    {/* I need to list these dynamically from what /listCourses returned */}
                                    <option value="John White">Example Course</option>
                                </select>
                            </div>
                            <div>  
                                <select class="form-control" onChange={this.getAssignments} name="course" id="course">
                                    {/* now i list what i get back from /list assignments */}
                                    <option value="John White">Example Course</option>
                                </select>
                            </div>  
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.togglePopup}>
                        Cancel
                        </Button>
                        <Button variant="primary" onClick={this.addAssignmentResults()}> Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddPopup;