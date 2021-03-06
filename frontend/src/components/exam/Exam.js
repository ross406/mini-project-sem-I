import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css";
import classnames from "classnames";

// import questions from "../../questions.json";
import isEmpty from "../../utils/is-empty";

import correctNotification from "../../assets/audio/correct-answer.mp3";
import wrongNotification from "../../assets/audio/wrong-answer.mp3";
import buttonSound from "../../assets/audio/button-sound.mp3";
import cookie from "react-cookies";
import { setResult } from "../../actions/resultActions";
import { getQuestions } from "../../actions/questionActions";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      correctQuestionAsnswered: [],
      wrongQuestionAsnswered: [],
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {},
    };
    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  componentDidMount() {
    let userInfo = cookie.load("userInfo");
    if (!userInfo) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    let questions = getQuestions();
    console.log("questions", questions);
    questions.then((data) =>
      this.setState({ questions: data }, () => {
        const { questions, currentQuestion, nextQuestion, previousQuestion } =
          this.state;
        this.displayQuestions(
          questions,
          currentQuestion,
          nextQuestion,
          previousQuestion
        );
        this.startTimer();
      })
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  handleOptionClick = (e) => {
    let wrongAnswered = this.state.wrongQuestionAsnswered.filter(
      (question) => question == this.state.currentQuestion.question
    );
    let correctAnswered = this.state.correctQuestionAsnswered.filter(
      (question) => question == this.state.currentQuestion.question
    );
    if (wrongAnswered.length > 0) {
      this.setState((prevState) => ({
        wrongAnswers: prevState.wrongAnswers - 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions - 1,
      }));
    }
    if (correctAnswered.length > 0) {
      this.setState((prevState) => ({
        score: prevState.score - 1,
        correctAnswers: prevState.correctAnswers - 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions - 1,
      }));
    }
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      // this.correctTimeout = setTimeout(() => {
      // this.correctSound.current.play();
      // }, 500);
      this.correctAnswer();
    } else {
      // this.wrongTimeout = setTimeout(() => {
      //   this.wrongSound.current.play();
      // }, 500);
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    // this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    // this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    // this.playButtonSound();
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.history.push("/");
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;

      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  correctAnswer = () => {
    M.toast({
      html: "Your Answer is Saved.",
      classes: "toast-valid",
      displayLength: 1500,
    });
    const correctQuestionAsnswered = this.state.correctQuestionAsnswered;
    let index = correctQuestionAsnswered.findIndex(
      (question) => question == this.state.currentQuestion.question
    );
    if (index == -1)
      correctQuestionAsnswered.push(this.state.currentQuestion.question);
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        correctQuestionAsnswered: correctQuestionAsnswered,
      }),

      () => {
        if (this.state.nextQuestion === undefined) {
          this.endExam();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    // navigator.vibrate(1000);
    M.toast({
      html: "Your Answer is Saved.",
      classes: "toast-valid",
      displayLength: 1500,
    });
    const wrongQuestionAsnswered = this.state.wrongQuestionAsnswered;
    let index = wrongQuestionAsnswered.findIndex(
      (question) => question == this.state.currentQuestion.question
    );
    if (index == -1)
      wrongQuestionAsnswered.push(this.state.currentQuestion.question);
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        wrongQuestionAsnswered: wrongQuestionAsnswered,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endExam();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    this.setState({
      usedFiftyFifty: false,
    });
  };

  startTimer = () => {
    const countDownTime = Date.now() + 900000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endExam();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
            distance,
          },
        });
      }
    }, 1000);
  };

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  endExam = () => {
    alert("Exam is eneded!");
    // call the API to save the results of users

    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints,
    };
    setResult(playerStats);
    setTimeout(() => {
      this.props.history.push("/exam/summary", playerStats);
    }, 1000);
  };

  render() {
    const { currentQuestion, currentQuestionIndex, numberOfQuestions, time } =
      this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Exam Page</title>
        </Helmet>
        <Fragment>
          {/* <audio ref={this.correctSound} src={correctNotification}></audio>
          <audio ref={this.wrongSound} src={wrongNotification}></audio> */}
          <audio ref={this.buttonSound} src={buttonSound}></audio>
        </Fragment>
        <div className="questions">
          <h2>Exam Mode</h2>

          <div className="timer-container">
            <p>
              <span className="left" style={{ float: "left" }}>
                {currentQuestionIndex + 1} of {numberOfQuestions}
              </span>
              <span
                className={classnames("right valid", {
                  warning: time.distance <= 120000,
                  invalid: time.distance < 30000,
                })}
              >
                {time.minutes}:{time.seconds}
                <span className="mdi mdi-clock-outline mdi-24px"></span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optiona}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionb}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionc}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optiond}
            </p>
          </div>

          <div className="button-container">
            <button
              className={classnames("", {
                disable: this.state.previousButtonDisabled,
              })}
              id="previous-button"
              onClick={this.handleButtonClick}
            >
              Previous
            </button>
            <button
              className={classnames("", {
                disable: this.state.nextButtonDisabled,
              })}
              id="next-button"
              onClick={this.handleButtonClick}
            >
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Exam;
