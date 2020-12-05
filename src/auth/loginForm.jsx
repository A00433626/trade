import React, { Component } from 'react'
import './loginForm.css'
import {Card,Row,Col,Container} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import {Button} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
const LoginForm = () => {
    const { loginWithRedirect, isAuthenticated,user } = useAuth0();
 
// export default LoginForm;
// class LoginForm extends Component{
//     State = {
//         isAuthenticated:false,
//         errorMessage:null,
//         userObject:null,
//     }
//     render() {  
    // console.log(this.props)
    console.log(isAuthenticated,user);
    if(isAuthenticated){
        // this.props.history.push('/dashboard');
        loginWithRedirect()
    }
    else{
        return ( 
            
            <Container className='login-container'>
                <Row>
                    <Col xs={12} className='login-body-column'>
                    <Card.Body className='login-body'>
                    <div className="homepage_nav-body">
                    <div className="homepage_image-container">
                    <img alt="Google" height="92" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
                    </div>
                    <div className="homepage_nav-search-input">
                    {/* <GoogleLogin
                        clientId="705392616254-tpjvpal0kv0dvq3vem4ajbherauooj6c.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={(e)=>this.props.onChange(e,this.props)}
                        onFailure={()=>this.props.onChange(this.props)}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                    {/* <LoginButton {...this.props}/> */}
                    { !isAuthenticated && (
                        <Button  onClick={() => {loginWithRedirect()}} variant='primary'>Login</Button>
                    )}
                        </div> 
                    </div>
                    </Card.Body>
                    </Col>
                </Row>
                
               
            </Container>

         );
                    }
    }

 
export default withAuth0(LoginForm);
