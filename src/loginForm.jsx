import React, { Component } from 'react'
import './loginForm.css'
import {Card,Row,Col,Container, Button} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import {RefreshTokenSetup} from '/Users/mcda/Desktop/Perennia Work/trade/src/utils/RefreshTokenSetup.jsx'
 
class LoginForm extends Component{
    State = {
        isAuthenticated:false,
        errorMessage:null,
        userObject:null,
    }
    render() { 
        console.log(this.props);
        
        return ( 
            <Container className='login-container'>
                <Row>
                    <Col xs={12}>
                    <Card.Body className='login-body'>
                    <div className="homepage_nav-body">
                    <div className="homepage_image-container">
                    <img alt="Google" height="92" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
                    </div>
                    <div className="homepage_nav-search-input">
                    <GoogleLogin
                        clientId="705392616254-tpjvpal0kv0dvq3vem4ajbherauooj6c.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={(e)=>this.props.onChange(e,this.props)}
                        onFailure={()=>this.props.onChange(this.props)}
                        cookiePolicy={'single_host_origin'}
                    />
                        </div> 
                    </div>
                    </Card.Body>
                    </Col>
                </Row>
                
               
            </Container>
         );
    }
}
 
export default LoginForm;