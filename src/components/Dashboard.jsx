import React, { Component } from 'react';
import './Dashboard.css';
import UnsafeScriptsWarning from "./UnsafeScriptsWarning";
import MainDashboard from './MainDashboard';
import LandingPage from './LandingPage';

class Dashboard extends Component {

  state = {
    hasError: false,
    showSpinner: true
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('some error has occured');
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  hideSpinner = () => {
    this.setState({showSpinner: false});
  }

  render() {
    if (this.state.hasError) {
      return <UnsafeScriptsWarning />;
    }
    return (
      <div className="App">
          <div className="header-container">
             <LandingPage/>
         </div>
         <div className="app-body">
            <div className="main-body-container">
              <MainDashboard hideSpinner={this.hideSpinner} user={this.props.user} showSpinner={this.state.showSpinner} />
            </div>
         </div>
      </div>
    );
  }
}

export default Dashboard;
