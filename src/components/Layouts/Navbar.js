import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  logOutUser() {
    localStorage.removeItem("username");
    localStorage.removeItem("activityType");
    this.props.history.push("/");
  }
  render() {
    let userInfo =JSON.parse(localStorage.getItem("userData"))
    return (
      <nav className="navbar navbar-expand-lg bg-blue">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="company-title">Med Delivery Dashboard</div>
          <div className="navbar-nav ml-auto">
            <ul>
              <li>
                {userInfo&&userInfo.full_name ? userInfo.full_name : null}
              </li>
              <li onClick={this.logOutUser.bind(this)}>Logout</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.user_reducer) {
    return {
      userInfo: state.user_reducer,
    };
  }
};

export default connect(mapStateToProps)(withRouter(Navbar));
