import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'

class LoginGoogle extends Component {

    responseGoogle=(response)=>{
        console.log(response);
        console.log(response.profileObj);
    }

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="1016357207758-8n5msp7af576bgts0a43fvasftb7q4fe.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }
}

export default LoginGoogle;

/*
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
export class LoginGoogle extends Component {

  //getting the response from the API & logging it
  responseGoogle=(response)=>{
    console.log(response);
    console.log(response.profileObj);
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="1016357207758-8n5msp7af576bgts0a43fvasftb7q4fe.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default LoginGoogle;
*/