import React, { Component } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { getResult } from "../../actions/resultActions";
import { register } from "../../actions/userActions";
import { getValue, setValue } from "../../utils/CookieService";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
    };
  }

  componentDidMount() {
    getResult();
    const allUsers = getValue("AllUsers");
    console.log("allUsers", allUsers);
    this.setState({ allUsers });
  }

  render() {
    const { fullName, email, password, confirmPassword } = this.state;
    return (
      <div
        style={{ backgroundColor: "#111", margin: 0, paddingBottom: "122px" }}
      >
        <div id="container_1">
          <h1 id="title" style={{ margin: 0, padding: "30px 20px" }}>
            Results
          </h1>
          <p id="description">
            Below is the List of users who appeared for the exam.
          </p>
          <p id="description">Click on their name to see the result</p>
        </div>
        <div id="container_2">
          <table>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email </th>
            </tr>
            {this.state.allUsers?.map((user, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>
                  <Link to={`/results/${user?.user_id}`}>
                    {user?.user_name}
                  </Link>
                </td>
                <td>{user?.user_email}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default Results;
