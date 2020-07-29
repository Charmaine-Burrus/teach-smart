import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
import { Axios } from 'axios';

class LoginGoogle extends Component {

    responseGoogle=(response)=>{
        console.log(response);
        //TODO: display error message to the user... maybe make an error page to redirect to?
    }

    login=(response)=>{
      console.log(response);
      var id_token = response.tokenId;
      Axios.post('http://localhost:4000/login', id_token)
      .then(response => {
          localStorage.setItem("loggedInUser", response.data.email)
          this.props.history.push('/home');
      }).catch( error => {
          //TODO: display error message to the user... maybe make an error page to redirect to?
      });
    }

    render() {
        return (
            <div className="light-padding">
                <GoogleLogin
                    clientId="859167518630-2vfc35jchg1lndfmto5jolrvtsvf1kae.apps.googleusercontent.com"
                    buttonText="Continue with Google"
                    onSuccess={this.login}
                    isSignedIn={true}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    scope='https://www.googleapis.com/auth/classroom.courses.readonly'
                    scope='https://www.googleapis.com/auth/classroom.coursework.students.readonly'
                    scope='https://www.googleapis.com/auth/spreadsheets.readonly'
                />
            </div>
        );
    }
}

export default LoginGoogle;