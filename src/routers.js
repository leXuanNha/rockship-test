import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./Authentication/containers/Login";
import Register from "./Authentication/containers/Register";
import PostManagement from "./Post/containers/List";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage["rockship_uid"] ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

class AppRoutes extends React.Component {
  render() {
    return (
      <div>
        <PrivateRoute exact path="/" component={PostManagement} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    );
  }
}

export default AppRoutes;
