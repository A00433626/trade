import React, { Component } from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import Dashboard from '/Users/mcda/Desktop/Perennia Work/trade/src/components/Dashboard.jsx';
import AccountSummary from '/Users/mcda/Desktop/Perennia Work/trade/src/components/AccountSummary.jsx';
import {ACCOUNT_URL,DASHBOARD_URL} from './DashboardConstants';
import LoginForm from './auth/loginForm';
import PrivateRoute from './private-route';
import LandingPage from './components/LandingPage';
import './App.css';
class App extends Component {
  render() {
  
    return (
      <div className='App'>
        <div className="header-container">
             <LandingPage/>
         </div>
         <Switch>
            <Route exact path='/login' render={(props) => (<LoginForm {...props}/>)}></Route>
            <PrivateRoute path={`${ACCOUNT_URL}`} component={AccountSummary}></PrivateRoute>
            <PrivateRoute path={`${DASHBOARD_URL}`} component={Dashboard} {...this.props}></PrivateRoute>
            <Redirect from='/' to='/login' />
          </Switch> 
      </div>
    );
  }
}
 
export default withAuth0(App);
