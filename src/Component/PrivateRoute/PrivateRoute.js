import React ,{ useContext }from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
  import { UserContext } from '../../App';
  

const PrivateRoute = ({children, ...rest}) => {
    const [logInUser, setLogInUser]= useContext(UserContext);
    

    return (
        <Route
            {...rest}
            render={({ location }) =>
            logInUser.email ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
    />
    );
};

export default PrivateRoute;