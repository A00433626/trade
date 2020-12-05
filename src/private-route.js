import React from 'react';
import { Route } from 'react-router-dom';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import loading from "./assets/loading.svg";


const PrivateRoute = ({component,...args}) => {
    return ( 
    <Route
     component={withAuthenticationRequired(component,{onRedirecting:()=><loading/>})}
     {...args}/>
)}
 
export default PrivateRoute;