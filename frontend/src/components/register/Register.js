import React, { Component } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { register } from "../../actions/userActions";
import { setValue } from "../../utils/CookieService";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    const { fullName, email, password } = this.state;
    register(fullName, email, password, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { fullName, email, password, confirmPassword } = this.state;
    return (
      <div
        style={{ backgroundColor: "#111", margin: 0, paddingBottom: "122px" }}
      >
        <div id="container_1">
          <h1 id="title" style={{ margin: 0, padding: "30px 20px" }}>
            Register
          </h1>
          <p id="description">Enter the required data in the boxes.</p>
        </div>
        <div id="container_2">
          <form id="survey-form" onSubmit={this.onSubmit.bind(this)}>
            <label id="name-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form"
              required
              value={fullName}
              onChange={this.onChange.bind(this)}
              placeholder="Insert your full name"
            />
            <br />
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
            <label id="email-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form"
              required
              value={password}
              onChange={this.onChange.bind(this)}
              placeholder="password"
            />
            <label id="email-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form"
              required
              value={confirmPassword}
              onChange={this.onChange.bind(this)}
              placeholder="Confirm Password"
            />

            <input type="submit" id="submit" name="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
