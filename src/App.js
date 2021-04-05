import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import Dashboard from "./components/Dashboard";
import AccountSummary from "./components/AccountSummary";
import { ACCOUNT_URL, DASHBOARD_URL } from "./DashboardConstants";
import LoginForm from "./auth/loginForm";
import PrivateRoute from "./private-route";
import LandingPage from "./components/LandingPage";
import "./App.css";
class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="header-container">
					<LandingPage />
				</div>
				<Switch>
					{/* <Route
						exact
						path="/login"
						render={(props) => <LoginForm {...props} />}></Route> */}
					{/* <PrivateRoute
						path={`${ACCOUNT_URL}`}
						component={AccountSummary}></PrivateRoute>
					<PrivateRoute
						path={`${DASHBOARD_URL}`}
						component={Dashboard}
						{...this.props}></PrivateRoute> */}
					<Route path={ACCOUNT_URL} component={AccountSummary}></Route>
					<Route
						path={DASHBOARD_URL}
						component={Dashboard}
						{...this.props}></Route>
					<Redirect from="/" to={DASHBOARD_URL} />
				</Switch>
			</div>
		);
	}
}

export default withAuth0(App);
