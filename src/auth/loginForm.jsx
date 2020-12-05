import React from 'react'
import './loginForm.css'
import {Card,Row,Col,Container} from 'react-bootstrap';
import LoginButton from '../components/LoginButton';
import {Button} from 'react-bootstrap';
import { withAuth0,useAuth0 } from '@auth0/auth0-react';
import {ACCOUNT_URL,DASHBOARD_URL} from '../DashboardConstants'
const LoginForm = (props) => {
    const { loginWithRedirect, isAuthenticated,user } = useAuth0();
    console.log(isAuthenticated,props);
    if(isAuthenticated){
        if(props.match.path===DASHBOARD_URL)
           props.location.push(DASHBOARD_URL)
        else if(props.match.path===ACCOUNT_URL){
            props.location.push(ACCOUNT_URL)
        }
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
