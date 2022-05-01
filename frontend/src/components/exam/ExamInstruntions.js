import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import answer from "../../assets/img/answer.png";

import options from "../../assets/img/options.PNG";
import cookie from "react-cookies";
import { getQuestions } from "../../actions/questionActions";

class ExamInstruntions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }
  componentDidMount() {
    let userInfo = cookie.load("userInfo");
    if (!userInfo) {
      this.props.history.push("/");
    }
    let questions = getQuestions();
    console.log("questions", questions);
    questions.then((data) => {
      console.log(data);
      this.setState({ questions: data });
    });
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Exam Instructions - Exam App</title>
        </Helmet>
        <div className="instructions container">
          <h1>Exam Instructions</h1>
          <p>Ensure you read this guide from start to finish.</p>
          <ul className="browser-default" id="main-list">
            <li>
              The exam has a duration of 15 minutes and ends as soon as your
              time elapses.
            </li>
            <li>
              Each exam consists of {this.state.questions.length} questions.
            </li>
            <li>
              Every question contains 4 options.
              <img src={options} alt="Exam App options example" />
            </li>
            <li>
              Select the option which best answers the question by clicking (or
              selecting) it.
              <img src={answer} alt="Exam App answer example" />
            </li>

            <li>
              Feel free to quit (or retire from) the exam at any time. In that
              case your score will be revealed afterwards.
            </li>
            <li>The timer starts as soon as the exam loads.</li>
            <li>Let's do this if you think you've got what it takes?</li>
          </ul>
          <div>
            <span className="left">
              <Link to="/">Back</Link>
            </span>
            <span className="right">
              <Link to="/exam/start">Next</Link>
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ExamInstruntions;
