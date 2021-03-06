import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./components/Authentication/Login";
import Navbar from "./components/Layouts/Navbar";
import Sidebar from "./components/Layouts/Sidebar";
import NotFound from "./components/Layouts/NotFound";
import OrdersPage from "./components/Orders/AddNewOrder";
import ActivityPage from "./components/Activity/Activity";
import CustomerPage from "./components/Customers/Customers";

// Checks the user is login or not and then redirecting to the respective page
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("username") ? (
        <>
          <Navbar />
          <div className="d-flex">
            <Sidebar />
            <Component {...props} />{" "}
          </div>
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

// If user login then redirecting to the home page otherwise redirecting to signin page
const SignInComponent = () => {
  if (localStorage.getItem("username") != null) {
    return <Redirect to="/orders" />;
  } else {
    return <LoginPage />;
  }
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact strict path={"/"} component={SignInComponent} />
          <PrivateRoute exact path="/orders" component={OrdersPage} />
          <PrivateRoute exact path="/activity" component={ActivityPage} />
          <PrivateRoute exact path="/users" component={CustomerPage} />
          <Route exact path="/*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
