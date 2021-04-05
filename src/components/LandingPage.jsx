import React, { Component } from "react";
import "./LandingPage.css";
import LogoutButton from "./LogoutButton";
// import { APPLICATION_NAME } from "../DashboardConstants.jsx";
import { withAuth0 } from "@auth0/auth0-react";
class LandingPage extends Component {
	render() {
		const { user } = this.props.auth0;
		return (
			<div className="main-conatianer-header">
				{/* Account Logo */}
				<div className="main-conatianer-header-logo">
					{/* {user ?  */}
					<a href={`${DASHBOARD_URL}`} style={{ textDecoration: "none" }}>
						logo
					</a>
					{/* : "logo"} */}
				</div>
				{/* icons */}
				{/* {user && ( */}
				<div className="menu-icons">
					<div className="menu-icons-anchor">
						<a href={`${ACCOUNT_URL}`}>Account</a>
					</div>
					<div className="menu-icons-signout">
						<LogoutButton />
					</div>
				</div>
				{/* )} */}
			</div>
		);
	}
}
export default withAuth0(LandingPage);
