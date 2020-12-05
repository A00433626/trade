import React from 'react'
import { withAuth0,useAuth0 } from '@auth0/auth0-react';
import {Button} from 'react-bootstrap';
import {Card,Row,Col,Container} from 'react-bootstrap';
import './loginForm.css'
const LoginForm = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if(isAuthenticated){
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
