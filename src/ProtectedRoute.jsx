import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({
	path,
	component: Component,
	render,
	getUser,
	rejectionRoute,
	...rest
}) => {
	let user = getUser();
	console.log("Entered");
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!user) {
					let route = !rejectionRoute
						? '/unspecifiedRejectionRoute'
						: rejectionRoute;

					return <Redirect to={route} />;
				}
				if (Component) {
					return <Component {...props} />;
				}

				return render(props);
			}}
		/>
	);
};

export default ProtectedRoute;
