import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getValue, removeValue } from "../utils/CookieService";
import { parseJwt } from "../utils/jwtService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      showResultsButton: false,
    };
  }

  componentDidMount() {
    const userInfo = getValue("userInfo");
    if (userInfo) {
      this.setState({ userInfo });
      let jwtData = parseJwt(userInfo.jwtToken);
      console.log("jwtData", jwtData);
      if (jwtData.user.isAdmin) {
        this.setState({ showResultsButton: true });
      }
    }
  }

  startClicked() {
    if (this.state.userInfo) {
      console.log("CAME");
      this.props.history.push("/exam/instructions");
    } else {
      alert("You need to Login first.");
    }
  }

  handleLogout() {
    removeValue("userInfo");
    this.setState({ userInfo: null });
    alert("You are logged out!");
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
            {this.state.userInfo ? (
              <>
                <div className="auth-container">
                  <div
                    onClick={this.handleLogout.bind(this)}
                    className="auth-buttons"
                    id="signup-button"
                    style={{ backgroundColor: "Blue" }}
                  >
                    Logout
                  </div>
                </div>
                <div className="auth-container">
                  {this.state.showResultsButton && (
                    <>
                      <Link
                        to="/results"
                        disabled
                        className="auth-buttons"
                        id="signup-button"
                        style={{ backgroundColor: "yellowgreen" }}
                      >
                        Results
                      </Link>
                      <Link
                        to="/set-questions"
                        disabled
                        className="auth-buttons"
                        id="signup-button"
                      >
                        Set Questions
                      </Link>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="auth-container">
                <Link
                  to="/login"
                  disabled
                  className="auth-buttons"
                  id="signup-button"
                  style={{ backgroundColor: "blue" }}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  disabled
                  className="auth-buttons"
                  id="signup-button"
                >
                  Register
                </Link>
              </div>
            )}
          </section>
        </div>
      </Fragment>
    );
  }
}
export default Home;
