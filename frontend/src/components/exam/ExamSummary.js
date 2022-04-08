import React, { Component, Fragment } from "react";
import cookie from "react-cookies";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getValue } from "../../utils/CookieService";

class ExamSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintsUsed: 0,
      fiftyFiftyUsed: 0,
      fullName: getValue("fullName"),
      email: getValue("email"),
      age: getValue("age"),
    };
  }

  componentDidMount() {
    let email = cookie.load("email");
    if (!email) {
      this.props.history.push("/");
    } else {
      const { state } = this.props.location;
      if (state) {
        this.setState({
          score: (state.score / state.numberOfQuestions) * 100,
          numberOfQuestions: state.numberOfQuestions,
          numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
          correctAnswers: state.correctAnswers,
          wrongAnswers: state.wrongAnswers,
          hintsUsed: state.hintsUsed,
          fiftyFiftyUsed: state.fiftyFiftyUsed,
        });
      }
    }
  }

  render() {
    const { state } = this.props.location;
    let stats, remark;
    const userScore = this.state.score;

    if (userScore <= 30) {
      remark = "You need more practice!";
    } else if (userScore > 30 && userScore <= 50) {
      remark = "Better luck next time!";
    } else if (userScore <= 70 && userScore > 50) {
      remark = "You can do better!";
    } else if (userScore >= 71 && userScore <= 84) {
      remark = "You did great!";
    } else {
      remark = "You're an absolute genius!";
    }

    if (state !== undefined) {
      stats = (
        <Fragment>
          <div style={{ textAlign: "center" }}>
            <span className="mdi mdi-check-circle-outline success-icon"></span>
          </div>
          <h1>Exam has ended</h1>
          <div className="container stats">
            <h4>{remark}</h4>
            <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
            <span className="stat left">Full Name: </span>
            <span className="right">{this.state.fullName}</span>
            <br />
            <span className="stat left">Email: </span>
            <span className="right">{this.state.email}</span>
            <br />
            <span className="stat left">Age: </span>
            <span className="right">{this.state.age}</span>
            <br />
            <br />
            <span className="stat left">Total number of questions: </span>
            <span className="right">{this.state.numberOfQuestions}</span>
            <br />
            <span className="stat left">Number of attempted questions: </span>
            <span className="right">
              {this.state.numberOfAnsweredQuestions}
            </span>
            <br />
            <span className="stat left">Number of Correct Answers: </span>
            <span className="right">{this.state.correctAnswers}</span> <br />
            <span className="stat left">Number of Wrong Answers: </span>
            <span className="right">{this.state.wrongAnswers}</span>
            <br />
          </div>
          <section>
            <ul>
              {/* <li>
                <Link to="/exam/start">Play Again</Link>
              </li> */}
              <li>
                <Link to="/">Back to Home</Link>
              </li>
            </ul>
          </section>
        </Fragment>
      );
    } else {
      stats = (
        <section>
          <h1 className="no-stats">No Statistics Available</h1>
          <ul>
            <li>
              <Link to="/exam/start">Take an Exam</Link>
            </li>
            <li>
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
        </section>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>Exam App - Summary</title>
        </Helmet>
        <div className="quiz-summary">{stats}</div>
      </Fragment>
    );
  }
}

export default ExamSummary;
