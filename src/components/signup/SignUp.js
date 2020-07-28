import React, { Component } from 'react';
import Axios from 'axios';
import LoginGoogle from './googlelogin/LoginGoogle';

class SignUp extends Component {

    // saying in my state i have a user object has all these fields
    state = {
        user : {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            school: ''
        }
    }

    handleSubmit = () => {
        Axios.post('http://localhost:4000/register', this.state.user)
        .then(response => {
            //navigate to thank you page
            this.props.history.push('/thank-you');
        }).catch( error => {
            //TODO: display error message to the user
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempUser = {...this.state.user};
        //this updates "name" field of tempuser... this is a shortcut
        tempUser[name] = value;
        this.setState(
            {
                user: tempUser
            }
        );
    }

    render() {
        return (
            <div className="signup">
                <div className="corral text-center">
                    <div id="content" className="contentContainer activeContent contentContainerBordered">
                    <h3>Login with Google</h3>
                    <LoginGoogle/>

                    <h3>OR</h3>
                    <h3>Sign up here</h3>
                    <form>
                        <div className="form-row mb-1">
                            <div className="col">
                                <input onChange={this.handleChange} name="firstName" value={this.state.user.firstName} type="text" className="form-control" placeholder="First name"/>
                            </div>
                            <  div className="col">
                                <input onChange={this.handleChange} name="lastName" value={this.state.user.lastName} type="text" className="form-control" placeholder="Last name"/>
                            </div>
                        </div>

                        <div className="form-row mb-2">   
                            <div className="col">
                                <input onChange={this.handleChange} name="school" value={this.state.user.school} type="text" className="form-control" placeholder="Name of School"/>
                            </div> 
                        </div>

                        <div className="form-row mb-2">
                            <  div className="col">
                                <input onChange={this.handleChange} name="email" value={this.state.user.email} type="text" className="form-control" placeholder="Email"/>
                            </div>
                        </div>    

                        <div className="form-row mb-2">
                            <  div className="col">
                                <input onChange={this.handleChange} name="password" value={this.state.user.password} type="text" className="form-control" placeholder="Password"/>
                            </div>
                        </div>
                        <button onClick={this.handleSubmit} type="button" class="btn btn-outline-success btn-lg btn-block">Sign Up</button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;