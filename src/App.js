import * as React from 'react';
import { Component } from 'react';
import {Redirect,BrowserRouter,Route,Switch,withRouter} from 'react-router-dom';
import './App.css'
import GoogleLogin from 'react-google-login';
import LoginForm from './loginForm';
import Dashboard from '/Users/mcda/Desktop/Perennia Work/trade/src/components/Dashboard.jsx'
import AccountSummary from '/Users/mcda/Desktop/Perennia Work/trade/src/components/AccountSummary.jsx';
import {RefreshTokenSetup} from '/Users/mcda/Desktop/Perennia Work/trade/src/utils/RefreshTokenSetup.jsx'
import ProtectedRoute from '/Users/mcda/Desktop/Perennia Work/trade/src/ProtectedRoute.jsx';
class InternalApp extends Component {
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
  render() { 
    return (
      <div className='App'>
      <BrowserRouter>
         <Switch>
            <Route exact path='/login' render={(props) => (<LoginForm {...props} onChange={this.responseGoogle}/>)}></Route>
            <Route path='/dashboard' render={(props) => (<Dashboard user={this.state.userObject}/>)}></Route>
            <Route path='/accountsummary' render={(props) => (<AccountSummary signOut={()=>this.handleSignOut()} {...props}/>)}></Route>
            <Redirect from='/' to='/login' />
          </Switch> 
          </BrowserRouter>
      </div>
    );
  }
}
const App = withRouter((props) => <InternalApp {...props} />);
 
export default App;

// class InternalApp extends Component {
// 	state = {
// 		user: null,
// 		hasCalledApi: false,
// 	};
//   responseGoogle=(response)=>{

//    if(response.error)
//         {
//           localStorage.setItem('user',)
//           this.setState({isAuthenticated:false})
//         }
//         else if(response.profileObj)
//         {
//           console.log(response.profileObj);
//           localStorage.setItem('user',response.profileObj)
//           this.setState({isAuthenticated:true,user:response.profileObj});
//           // RefreshTokenSetup(response);
//         }
//       }
// 	setUser = (user, nullCheck) => {
// 		if (nullCheck === undefined || nullCheck === null || nullCheck) {
// 			if (user === null || user === undefined) return false;
// 		}
// 		this.setState({ user: user });
// 		return true;
// 	};

// 	setHasCalledApi;

// 	// getUserOrQueryApi = async () => {
// 	// 	let currentUser = this.getUser();
// 	// 	if (!currentUser) {
// 	// 		try {
			  
// 	// 			this.setUser(currentUser, null);
// 	// 		} catch (e) {
// 	// 		} finally {
// 	// 			this.setState({ hasCalledApi: true });
// 	// 		}
// 	// 	}
// 	// 	return currentUser;
// 	// };

// 	// getUser = () => {
// 	// 	return this.state.user;
// 	// };

// 	// hasCalledApi = () => {
// 	// 	return this.state.hasCalledApi;
// 	// };

// 	// async componentDidMount() {
// 	// 	await this.getUserOrQueryApi();
// 	// }

// 	render() {
// 		const authProps = {
// 			user: this.state.user,
// 			setUser: this.setUser,
// 		};
// console.log(authProps);
// 		//console.log(this.props.location.pathname);
// 		if (this.state.hasCalledApi === false) return <h1>Loading...</h1>;
// 		return (
// 			<Switch>
// 				<Route
// 					exact
// 					path='/login'
// 					render={(props) => (
// 						<LoginForm
// 							auth={authProps}
// 							{...props}
//               onSuccessLocation='/dashboard'
//               onChange={this.responseGoogle}
// 						/>
// 					)}
// 				/>
// 				<ProtectedRoute
// 					path={`/dashboard`}
// 					getUser={this.getUser}
// 					render={(props) => {
// 						return <Dashboard auth={authProps} {...props} />;
// 					}}
// 					rejectionRoute='/login'
// 					component={null}
// 				/>
// 				<Redirect from='/' to='/login' />
// 			</Switch>
// 		);
// 	}
// }

// const App = withRouter((props) => <InternalApp {...props} />);

// export default App;
