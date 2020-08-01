import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
import Axios from 'axios';

class LoginGoogle extends Component {

    SCOPES = 'profile email https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/classroom.student-submissions.students.readonly'

    responseGoogle=(response)=>{
        console.log("Failed ::> ",response);
    }

    login=(response)=>{
      console.log("SUCCESS ::> ",response);
      var id_token = response.tokenId;
      const accessToken = response.wc.access_token;
      localStorage.setItem("accessToken", accessToken);
      console.log(id_token)
      //TO DO: how do I send the id_token in the header?
      const data = {googleTokenId: id_token};
      console.log(data);
      Axios.post('http://localhost:4000/login', data)
      .then(response => {
          console.log(response.data);
          localStorage.setItem("loggedInUser", response.data.email);
          localStorage.setItem("profilePic", response.data.pictureUrl);
          localStorage.setItem("firstName", response.data.firstName);
          localStorage.setItem("lastName", response.data.lastName);
          localStorage.setItem("authToken", response.data.googleTokenId);
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
                    isSignedIn={false}
                    onFailure={this.responseGoogle}
                    prompt='consent'
                    // responseType='id_token token permission'
                    approvalPrompt="force"
                    cookiePolicy={'single_host_origin'}
                    scope={this.SCOPES}
                />
            </div>
        );
    }
}

export default LoginGoogle;