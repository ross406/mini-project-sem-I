import React, { Component, useEffect, useState } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { getResult, getStudentResult } from "../../actions/resultActions";
import { register } from "../../actions/userActions";
import { getValue, setValue } from "../../utils/CookieService";
import { parseJwt } from "../../utils/jwtService";

const Result = (props) => {
  const [studentResult, setStudentResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let jwtData = parseJwt(getValue("userInfo").jwtToken);
    console.log("jwtData", jwtData);
    if (!jwtData.user.isAdmin) {
      this.props.history.push("/");
    } else {
      console.log("this.props", props);
      let data = getStudentResult(props.match.params.id);
      const studentResult = data;
      studentResult
        .then((data) => {
          setStudentResult(data);
          setLoading(false);
        })
        .catch((err) => console.log("err", err));
    }
  }, []);

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
          Result
        </h1>
        <p id="description">
          Below is the List of exam the user is appeared for.
        </p>
      </div>
      {loading ? (
        <div id="container_2">
          <h3 id="title" style={{ margin: 0, padding: "30px 20px" }}>
            Loading...
          </h3>
        </div>
      ) : (
        <div>
          {studentResult.length > 0 ? (
            <div id="container_2">
              <table style={{ marginLeft: "50px" }}>
                <tr>
                  <th>ID</th>
                  <th>Total Questions</th>
                  <th>Attempted Questions </th>
                  <th>Correct Answers </th>
                  <th>Wrong Answers </th>
                </tr>
                {studentResult.map((result, key) => (
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
          ) : (
            <div id="container_2">
              <h3 id="title" style={{ margin: 0, padding: "30px 20px" }}>
                This student is not appeared for this Exam.
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Result;
