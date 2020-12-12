import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { storeLoginData } from "../../redux/actions/userActions";
import swal from "sweetalert";
let userJSONData = require("../../constants/login_details.json");

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {
        email: "",
        password: "",
      },
      touched: {
        email: false,
        password: false,
      },
      loggedInStatus: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const targetName = target.name;
    const userDetails = Object.assign({}, this.state.userDetails);
    userDetails[targetName] = target.value;
    this.setState({
      userDetails,
    });
  }

  onBlur(e) {
    let touched = Object.assign({}, this.state.touched);
    touched[e.target.name] = true;
    this.setState({
      touched,
    });
  }

  // Login validation
  validate() {
    const errors = {};
    const { email, password } = this.state.userDetails;

    if (!email) {
      errors.email = "Please enter email";
    }
    if (!password) {
      errors.password = "Please enter password";
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  }

  // Submitting login
  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state.userDetails;
    if (userJSONData.username === email && userJSONData.password === password) {
      localStorage.removeItem("email");
      localStorage.removeItem("activityType");
      this.props.storeLoginData(userJSONData);
      localStorage.setItem("email", email);
      this.setState({
        user: {
          email: "",
          password: "",
        },
        touched: {
          email: false,
          password: false,
        },
        loginCompleted: true,
      });
    } else {
      swal({
        text: "Please enter valid credentials",
        icon: "error",
      });
    }
  }

  render() {
    if (this.state.loginCompleted) {
      return <Redirect to="/orders" />;
    } else {
      const { touched, userDetails } = this.state;
      const { errors, isValid } = this.validate();
      return (
        <div className="d-flex justify-content-center align-items-center bg-body hv-100">
          <div className="login">
            <form onSubmit={this.onSubmit}>
              <div className="logo-box"><div className="logo">LOGO</div></div>
              <div className="form-group row">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={userDetails.email}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  className="form-control"
                  required
                />
                {touched.email && !!errors.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="form-group row">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  className="form-control"
                  required
                />
                {touched.password && !!errors.password && (
                  <span className="error">{errors.password}</span>
                )}{" "}
              </div>
              <button
                type="submit"
                className="row btn btn-info login-button"
                disabled={!isValid}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  if (state.user_reducer) {
    return {
      userInfo: state.user_reducer,
    };
  }
};

const mapDispatchToProps = {
  storeLoginData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
