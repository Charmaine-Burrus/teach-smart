import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
import Axios from 'axios';

class LoginGoogle extends Component {

    SCOPES = 'profile email https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/classroom.student-submissions.students.readonly'

    responseGoogle=(response)=>{
        console.log(response);
    }

    login=(response)=>{
      console.log(response);
      var id_token = response.tokenId;
      console.log(id_token)
      //TO DO: how do I send the id_token in the header?
      Axios.post('http://localhost:4000/login', {tokenId: id_token})
      .then(response => {
          console.log(response.data);
          localStorage.setItem("loggedInUser", response.data.email);
          localStorage.setItem("profilePic", response.data.pictureUrl);
          localStorage.setItem("firstName", response.data.firstName);
          localStorage.setItem("lastName", response.data.lastName);
          localStorage.setItem("authToken", response.data.googleTokenId);
        //   localStorage.setItem("loggedInUser", JSON.stringify(response.data));
          this.props.history.push('/home');
        }).catch( error => {
        console.log(error);
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
                    scope={this.SCOPES}
                />
            </div>
        );
    }
}

export default LoginGoogle;