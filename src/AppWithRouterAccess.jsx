import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Dashboard from '/Users/mcda/Desktop/Perennia Work/trade/src/components/Dashboard.jsx';
import SignInWidget from './auth/SignIn';
import AccountSummary from './components/AccountSummary';

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <Security issuer='https://dev-4746020.okta.com/oauth2/default'
                clientId='0oa1m7hw7D7vJEH9s5d6'
                redirectUri={window.location.origin + '/login/callback'}
                onAuthRequired={this.onAuthRequired}
                pkce={true} >
        <Route path='/accountSummary' exact={true} component={<AccountSummary/>} />
        <SecureRoute path='/protected' component={<Dashboard/>} />
        <Route path='/login' render={() => <SignInWidget issuer='https://dev-4746020.okta.com/oauth2/default' />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Security>
    );
  }

});
