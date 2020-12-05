import React, { Component } from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import './App.css'
// import GoogleLogin from 'react-google-login';
import Dashboard from '/Users/mcda/Desktop/Perennia Work/trade/src/components/Dashboard.jsx'
import AccountSummary from '/Users/mcda/Desktop/Perennia Work/trade/src/components/AccountSummary.jsx';
import {ACCOUNT_URL,DASHBOARD_URL} from './DashboardConstants'
import LoginForm from './auth/loginForm';
import { withAuth0 } from '@auth0/auth0-react';
import PrivateRoute from './private-route';
class App extends Component {
  state = {
    isAuthenticated:false,
    errorMessage:'',
    userObject:null,
    hasCalledApi:false,
}
  // responseGoogle=(response,e)=>{
  //   if(response.error)
  //   {
  //     this.setState({isAuthenticated:false})
  //   }
  //   else if(response.profileObj)
  //   {
  //     console.log(response.profileObj);
  //     localStorage.setItem(response.profileObj.givenName,JSON.stringify([]))
  //     this.setState({isAuthenticated:true,userObject:response.profileObj});
  //     e.history.replace("./dashboard")
  //   }
  // }

  // handleSubmit=()=>{
  //   console.log('clicked');
  //   this.setState({hasCalledApi:true})
  // }
  // handleSignOut=()=>{

  // }
  componentDidMount=()=>{
    const { user } = this.props.auth0;
    this.setState({userObject:user})
  }
  render() {
    console.log(ACCOUNT_URL,DASHBOARD_URL,this.state.userObject);
    return (
      <div className='App'>
         <Switch>
            <Route exact path='/login' render={(props) => (<LoginForm {...props}/>)}></Route>
            <PrivateRoute path={`${ACCOUNT_URL}`} component={AccountSummary}></PrivateRoute>
            <PrivateRoute path={`${DASHBOARD_URL}`} component={Dashboard} {...this.props}></PrivateRoute>
             {/* render={(props) => (<Dashboard {...user} user={this.state.userObject}/>)}></Route> */}
          
             {/* <Route  path='/accountsummary' render={(props) => (<AccountSummary user={this.state.userObject} signOut={()=>this.handleSignOut()} {...props}/>)}></Route> */}
            <Redirect from='/' to='/login' />
          </Switch> 
      </div>
    );
  }
}
 
export default withAuth0(App);
