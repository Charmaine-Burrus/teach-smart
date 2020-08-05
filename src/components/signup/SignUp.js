import React, { Component } from 'react';
import LoginGoogle from './googlelogin/LoginGoogle';
import TeachSmartLogo from '../../images/TeachSmartLogo.png';

class SignUp extends Component {

    render() {
        return (
            <div className="signup">
                <div className="corral text-center">
                    <div id="content" className="contentContainerBordered">
                        <h3>Welcome to</h3>
                        <img src={TeachSmartLogo} className="logo" alt="TeachSmart"/>
                        {/* <h5>Data-informed instruction has never been easier!</h5> */}
                        <hr/>
                        <LoginGoogle {...this.props}/>
                        <p>For Both New and Returning Users</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;