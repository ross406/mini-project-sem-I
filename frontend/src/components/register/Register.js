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
    const { fullName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Password and Confirm Password should match!" });
    } else if (password.length < 6) {
      this.setState({ error: "Password should be more than 6 charecters!" });
    } else {
      register(
        fullName,
        email.toLowerCase(),
        password,
        this.props.history,
        function (err) {
          console.log("err>>>", err.message);
          if (err.message) {
            this.setState({ error: "This user Already Exists!" });
          }
        }.bind(this)
      );
    }
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
        style={{
          backgroundColor: "#111",
          margin: 0,
          paddingBottom: "122px",
          minHeight: "100vh",
        }}
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
            {this.state.error !== "" && (
              <p style={{ color: "red" }}>{this.state.error}</p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
