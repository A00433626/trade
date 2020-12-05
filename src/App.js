import * as React from 'react';
import { Component } from 'react';
import {Redirect,BrowserRouter,Route,Switch,withRouter} from 'react-router-dom';
import './App.css'
import GoogleLogin from 'react-google-login';
import Dashboard from '/Users/mcda/Desktop/Perennia Work/trade/src/components/Dashboard.jsx'
import AccountSummary from '/Users/mcda/Desktop/Perennia Work/trade/src/components/AccountSummary.jsx';
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
  responseGoogle=(response,e)=>{
    if(response.error)
    {
      this.setState({isAuthenticated:false})
    }
    else if(response.profileObj)
    {
      console.log(response.profileObj);
      localStorage.setItem(response.profileObj.givenName,JSON.stringify([]))
      this.setState({isAuthenticated:true,userObject:response.profileObj});
      e.history.replace("./dashboard")
    }
  }

  handleSubmit=()=>{
    console.log('clicked');
    this.setState({hasCalledApi:true})
  }
  handleSignOut=()=>{

  }
  componentDidMount=()=>{
    const { user } = this.props.auth0;
    this.setState({userObject:user})
  }
  render() { 
    console.log(this.state.userObject,this.props.user)
    return (
      <div className='App'>
      {/* <BrowserRouter> */}
         <Switch>
            <Route exact path='/login' render={(props) => (<LoginForm/>)}></Route>
            <PrivateRoute path='/dashboard' component={Dashboard}></PrivateRoute>
             {/* render={(props) => (<Dashboard {...user} user={this.state.userObject}/>)}></Route> */}
            <PrivateRoute path='/accountsummary' component={AccountSummary}></PrivateRoute>
             {/* <Route  path='/accountsummary' render={(props) => (<AccountSummary user={this.state.userObject} signOut={()=>this.handleSignOut()} {...props}/>)}></Route> */}
            <Redirect from='/' to='/login' />
          </Switch> 
          {/* </BrowserRouter> */}
      </div>
    );
  }
}
// const App = withRouter((props) => <InternalApp {...props} />);
 
export default withAuth0(App);
