import React, { Component } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { login } from "../../actions/userActions";
import { setValue } from "../../utils/CookieService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    let userInfo = cookie.load("userInfo");
    if (userInfo) {
      this.props.history.push("/");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    login(
      email.toLowerCase(),
      password,
      this.props.history,
      function (err) {
        if (err.message) {
          this.setState({ error: "Email or password is wrong!" });
        }
      }.bind(this)
    );
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div
        style={{
          backgroundColor: "#111",
          margin: 0,
          paddingBottom: "122px",
          minHeight: "100vh",
        }}
      >
        <div id="container_1">
          <h1 id="title" style={{ margin: 0, padding: "30px 20px" }}>
            Login
          </h1>
          <p id="description">Enter the required data in the boxes.</p>
        </div>
        <div id="container_2">
          <form id="survey-form" onSubmit={this.onSubmit.bind(this)}>
            <label id="email-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form"
              required
              value={email}
              onChange={this.onChange.bind(this)}
              placeholder="Insert your email"
            />
            <br />
            <label id="number-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form"
              required
              value={password}
              onChange={this.onChange.bind(this)}
              placeholder="Insert your password"
            />

            <input type="submit" id="submit" name="submit" value="Submit" />
            {this.state.error !== "" && (
              <p style={{ color: "red" }}>{this.state.error}</p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
