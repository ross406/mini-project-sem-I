import React, { Component } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { setValue } from "../../utils/CookieService";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      age: "",
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
    setValue("fullName", this.state.fullName);
    setValue("email", this.state.email);
    setValue("age", this.state.age);
    this.props.history.push("/exam/instructions");
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { fullName, email, age } = this.state;
    return (
      <div
        style={{ backgroundColor: "#111", margin: 0, paddingBottom: "122px" }}
      >
        <div id="container_1">
          <h1 id="title" style={{ margin: 0, padding: "30px 20px" }}>
            Student Registration
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
            <label id="number-label">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              className="form"
              placeholder="Age"
              value={age}
              min={18}
              max={60}
              onChange={this.onChange.bind(this)}
              required
            />

            <input type="submit" id="submit" name="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
