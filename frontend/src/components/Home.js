import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getValue, removeValue } from "../utils/CookieService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      buttonText: "Register",
    };
  }

  componentDidMount() {
    const email = getValue("email");
    if (email) {
      this.setState({ email, buttonText: "Logout" });
    }
  }

  startClicked() {
    if (this.state.email) {
      this.props.history.push("/exam/instructions");
    } else {
      alert("You need to Register first.");
    }
  }

  loginLogoutButton() {
    if (this.state.email) {
      removeValue("fullName");
      removeValue("email");
      removeValue("age");
      alert("You are logged out!");
      this.setState({
        email: null,
        buttonText: "Register",
      });
    } else {
      this.props.history.push("/register");
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Exam App - Home</title>
        </Helmet>
        <div id="home">
          <section>
            <div style={{ textAlign: "center" }}>
              <span class="mdi mdi-cube-outline cube"></span>
            </div>
            <h1>Exam App</h1>
            <div className="play-button-container">
              <ul>
                <li>
                  <div
                    className="play-button"
                    onClick={this.startClicked.bind(this)}
                  >
                    Start
                  </div>
                </li>
              </ul>
            </div>
            <div className="auth-container">
              <div
                onClick={this.loginLogoutButton.bind(this)}
                className="auth-buttons"
                id="login-button"
              >
                {this.state.buttonText}
              </div>
            </div>
            {/*
              <Link
                to="/register"
                disabled
                className="auth-buttons"
                id="signup-button"
              >
                Sign Up
              </Link>
             */}
          </section>
        </div>
      </Fragment>
    );
  }
}
export default Home;
