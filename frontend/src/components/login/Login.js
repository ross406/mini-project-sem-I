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
    };
  }

  componentDidMount() {
    let email = cookie.load("email");
    if (email) {
      this.props.history.push("/");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    login(email, password);
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
        style={{ backgroundColor: "#111", margin: 0, paddingBottom: "122px" }}
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
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
