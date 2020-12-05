import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';
import './LandingPage.css';
import {Avatar} from '@material-ui/core';
import LogoutButton from './LogoutButton';

class LandingPage extends Component{
    state = {   }
    render() { 
       return (
     <div className="main-conatianer-header">
         {/* Account Logo */}
         <div className="main-conatianer-header-logo">
             Company Name
         </div>
         {/* icons */}
         <div className="menu-icons">
         <div className="menu-icons-anchor">
           <a href='#'>notification</a>
         </div>
         <div className="menu-icons-dropdown">
            <Dropdown>
              <Dropdown.Toggle variant='none' className="dropdown-basic">
                  <Avatar/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/accountsummary">Account </Dropdown.Item>
                <Dropdown.Item href="/"><LogoutButton/></Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
          </div>
         </div>
     </div>
       );
    }
}
export default LandingPage;