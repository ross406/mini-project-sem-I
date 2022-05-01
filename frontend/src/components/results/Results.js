import React, { Component, useEffect, useState } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { getResult } from "../../actions/resultActions";
import { register } from "../../actions/userActions";
import { getValue, setValue } from "../../utils/CookieService";
import { parseJwt } from "../../utils/jwtService";

const Results = () => {
  const [allUsers, setAllUsers] = useState(getValue("AllUsers"));

  useEffect(() => {
    let jwtData = parseJwt(getValue("userInfo").jwtToken);
    console.log("jwtData", jwtData);
    if (!jwtData.user.isAdmin) {
      this.props.history.push("/");
    } else {
      let data = getResult();
      const allUsers = data;
      allUsers
        .then((data) => {
          setAllUsers(data);
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
          Results
        </h1>
        <p id="description">
          Below is the List of users who appeared for the exam.
        </p>
        <p id="description">Click on their name to see the result</p>
      </div>
      <div id="container_2">
        <table style={{ marginLeft: "300px" }}>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email </th>
          </tr>
          {allUsers?.map((user, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>
                <Link to={`/results/${user?.user_id}`}>{user?.user_name}</Link>
              </td>
              <td>{user?.user_email}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Results;
