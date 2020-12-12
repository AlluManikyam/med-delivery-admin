import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Header extends Component {

  render() {
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
        <div className="company-title">RK Dashboard</div>
          
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
