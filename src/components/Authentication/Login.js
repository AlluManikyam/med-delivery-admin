import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { storeLoginData } from "../../redux/actions/userActions";
import swal from "sweetalert";
import commonUtils from "../../utils/ApiCalls.js";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {
        username: "",
        password: "",
      },
      touched: {
        username: false,
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
    const { username, password } = this.state.userDetails;

    if (!username) {
      errors.username = "Please enter username";
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
    const { username, password } = this.state.userDetails;
    let payload = { phone: username, password };
    commonUtils.login(payload).then((response) => {
      if (response && response.status === "success") {
        localStorage.removeItem("username");
        localStorage.setItem("username", username);
        localStorage.setItem("userData", JSON.stringify(response.data));
        this.setState({
          user: {
            username: "",
            password: "",
          },
          touched: {
            username: false,
            password: false,
          },
          loginCompleted: true,
        });
      } else {
        swal({
          text: response.msg,
          icon: "error",
        });
      }
    });
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
              <div className="logo-box">
                <div className="logo">LOGO</div>
              </div>
              <div className="form-group row">
                <label>username</label>
                <input
                  type="text"
                  name="username"
                  value={userDetails.username}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  className="form-control"
                  required
                />
                {touched.username && !!errors.username && (
                  <span className="error">{errors.username}</span>
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
