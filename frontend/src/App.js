import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import ExamInstruntions from "./components/exam/ExamInstruntions";
import Exam from "./components/exam/Exam";
import ExamSummary from "./components/exam/ExamSummary";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Results from "./components/results/Results";
import Result from "./components/results/Result";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/exam/instructions" exact component={ExamInstruntions} />
        <Route path="/exam/start" exact component={Exam} />
        <Route path="/exam/summary" exact component={ExamSummary} />
        <Route path="/results/:id" exact component={Result} />
        <Route path="/results" exact component={Results} />
      </Router>
    );
  }
}

export default App;
