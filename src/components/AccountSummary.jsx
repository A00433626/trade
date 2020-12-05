import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import * as React from 'react';
import { Component } from 'react';
import './AccountSummary.css';
import axios from 'axios';
import {Link} from'react-router-dom';
import { getUserData } from '../API';
import Skeleton from '@material-ui/lab/Skeleton';
import InfoBox from './common/InfoBox';
import LogoutButton from './LogoutButton'
import { withAuth0 } from '@auth0/auth0-react';
import {DASHBOARD_URL} from '../DashboardConstants'
 class AccountSummary extends Component{

    state = { 
        accountData:null,
        personalInfo:null,
        address:null,
      }

    getDataFromAPI = async () => {
       return (
            await axios.get(getUserData).then((res) => {
			            	if (res.status === 200) {
                      return (res.data.results[0])
			            	}
	            		}).catch((err) => console.log(err))
        ) };
		
    getUserInfo= (accountData)=>{
        const {location,picture,name,phone,dob:{age}}=accountData;
        let address={};
        let personalInfo={};
        address['location']=location;
        personalInfo['image']=picture;
        personalInfo['name']=name;
        personalInfo['phone']=phone;
        personalInfo['age']=age;
        this.setState({personalInfo,address});
        return null;
        
    }
	componentDidMount = async () => {
       let data= await this.getDataFromAPI();
       this.getUserInfo(data);
       this.setState({accountData:data})
	};
    render() { 
      console.log(this.props);
     const {accountData,personalInfo,address}=this.state;
        return ( 
            <Container className='account-summary-container'>
                <div className="account-summary-main-container">
                    <Link to={`${DASHBOARD_URL}`}><i className="fa fa-caret-left fa-lg"></i> Back</Link>
                <div className="account-summary-image">
                    {personalInfo ?(<img src={`${personalInfo.image.large}`} alt="image"/>) :(<Skeleton variant="circle" width={200} height={200} />)}
                </div>
                <Card.Body className="account-summary-card-body">
                    <Row className="account-summary-personal-information-conatainer">
                      <Col lg={4} xs={12} className="account-summary-name-information-row">
                      {personalInfo?(<InfoBox labelText='NAME' labelClass='account-summary-name-label' contentData={`${personalInfo?.name.title}. ${personalInfo?.name.first}  ${personalInfo?.name.last}`} contentClass='account-summary-name'/> ):(<Skeleton variant="rect" width={200}/>)} 
                      </Col>
                      <Col lg={4} xs={12} className="account-summary-age-information-row">
                      {personalInfo?(<InfoBox labelText='AGE' labelClass='account-summary-age-label' contentData={`${personalInfo?.age}`} contentClass='account-summary-age'/>):(<Skeleton variant="rect" width={200}/>)} 
                      </Col>
                      <Col lg={4} xs={12} className="account-summary-phone-information-row">
                    {personalInfo?(
                    ( <InfoBox labelText='PHONE' labelClass='account-summary-phone-label' contentData={`${personalInfo?.phone}`} contentClass='account-summary-phone'/>)
                  ):(<Skeleton variant="rect" width={200}/>)} 
                  
                  </Col>
                    </Row>
                    <Row className="account-summary-address-information-conatainer">
                      <Col lg={4} xs={12} className="account-summary-street-information-row">
                      {address?(
                        <InfoBox labelText='STREET' labelClass='account-summary-street-label' contentData={`${address?.location.street.number}   ${address?.location.street.name}`} contentClass='account-summary-street'/>
                      ):(<Skeleton variant="rect" width={200}/>)}
                      </Col>
                      <Col lg={4} xs={12} className="account-summary-country-information-row">
                      {address?(
                        <InfoBox labelText='CITY' labelClass='account-summary-city-label' contentData={`${address?.location.city}`} contentClass='account-summary-city'/>
                      ):(<Skeleton variant="rect" width={200}/>)}
                      </Col>
                      <Col lg={4} xs={12} className="account-summary-state-information-row"> {address?(
                        <InfoBox labelText='Country' labelClass='account-summary-country-label' contentData={`${address?.location.country}`} contentClass='account-summary-country'/>
                      ):(<Skeleton variant="rect" width={200}/>)} </Col>
                      <Col lg={4} xs={12} className="account-summary-country-information-row">
                      {address?(
                        <InfoBox labelText='POSTAL' labelClass='account-summary-postal-label' contentData={`${address?.location.postcode}`} contentClass='account-summary-postal'/>
                      ):(<Skeleton variant="rect" width={200}/>)}
                      </Col>
                    </Row>
                    <Row className="account-summary-signout">
                     <LogoutButton/>
                    </Row>
                </Card.Body>
                </div>
          
            </Container>
        );
    }
}
 
export default withAuth0(AccountSummary);