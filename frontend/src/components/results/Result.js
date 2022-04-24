import React, { Component } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { getResult, getStudentResult } from "../../actions/resultActions";
import { register } from "../../actions/userActions";
import { getValue, setValue } from "../../utils/CookieService";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentResult: [],
    };
  }

  componentDidMount() {
    console.log("this.props", this.props);
    getStudentResult(this.props.match.params.id);
    const studentResult = getValue("studentResult");
    console.log("studentResult", studentResult);
    this.setState({ studentResult });
  }

  render() {
    return (
      <div
        style={{ backgroundColor: "#111", margin: 0, paddingBottom: "122px" }}
      >
        <div id="container_1">
          <h1
            id="title"
            onClick={this.onSubmit}
            style={{ margin: 0, padding: "30px 20px" }}
          >
            Result
          </h1>
          <p id="description">
            Below is the List of users who appeared for the exam.
          </p>
          <p id="description">Click on their name to see the result</p>
        </div>
        <div id="container_2">
          <table>
            <tr>
              <th>ID</th>
              <th>Total Questions</th>
              <th>Attempted Questions </th>
              <th>Correct Answers </th>
              <th>Wrong Answers </th>
            </tr>
            {this.state.studentResult.map((result, key) => (
              <tr>
                <th>{result.result_id}</th>
                <th>{result.total_questions}</th>
                <th>{result.attempted_questions}</th>
                <th>{result.correct_answers}</th>
                <th>{result.wrong_answers}</th>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default Result;
