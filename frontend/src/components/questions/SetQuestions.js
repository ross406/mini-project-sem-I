import React, { useEffect, useState } from "react";
import questionsJson from "../../questions.json";
import { getValue } from "../../utils/CookieService";
import { parseJwt } from "../../utils/jwtService";
import Select from "react-select";
import { getQuestions, setAllQuestions } from "../../actions/questionActions";
import M from "materialize-css";

const SetQuestions = (props) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let jwtData = parseJwt(getValue("userInfo").jwtToken);
    if (!jwtData.user.isAdmin) {
      props.history.push("/");
    }
    let questions = getQuestions();
    questions.then((data) => {
      if (data.length > 0) {
        setQuestions(data);
      } else {
        setQuestions(questionsJson);
      }
    });
  }, []);

  const onChange = (name, value, index) => {
    let allQuestions = [...questions];
    allQuestions = allQuestions.map((question, idx) => {
      if (idx === index) {
        question[name] = value;
      }
      return question;
    });
    setQuestions(allQuestions);
  };

  const onChangeSelect = (e, index) => {
    onChange("answer", e.value, index);
  };
  const addNewQuestion = () => {
    let allQuestions = [...questions];
    let emptyQuestion = {
      question: "",
      optiona: "",
      optionb: "",
      optionc: "",
      optiond: "",
      answer: "",
    };
    allQuestions.push(emptyQuestion);
    setQuestions(allQuestions);
  };

  const saveAllQuestions = () => {
    console.log(questions);
    let allDataAvailable = questions.every((question) => {
      if (
        question.question !== "" &&
        question.optiona !== "" &&
        question.optionb !== "" &&
        question.optionc !== "" &&
        question.optiond !== "" &&
        question.answer !== ""
      ) {
        return true;
      }
      return false;
    });

    console.log("allDataAvailable", allDataAvailable);
    if (allDataAvailable) {
      setAllQuestions(questions, props.history);
    } else {
      M.toast({
        html: "Questions are not set Properly. Please Check for Errors!",
        classes: "toast-valid",
        displayLength: 1500,
      });
    }
  };

  const deleteQuestion = (index) => {
    var result = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (result == true) {
      console.log("OK");
      let allQuestions = [...questions];
      allQuestions.splice(index, 1);
      setQuestions(allQuestions);
      M.toast({
        html: "Question is removed!",
        classes: "toast-valid",
        displayLength: 1500,
      });
    } else {
      console.log("Cancel");
    }
  };

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
          Set Questions
        </h1>
        <p id="description">Set your questions below</p>
      </div>
      <div>
        {questions.map((question, index) => {
          const options = [
            { value: question.optiona, label: question.optiona },
            { value: question.optionb, label: question.optionb },
            { value: question.optionc, label: question.optionc },
            { value: question.optiond, label: question.optiond },
          ];
          return (
            <div key={index} className="question-container">
              <div
                onClick={() => deleteQuestion(index)}
                className="close-button"
              >
                X
              </div>
              <label>Question {index + 1}</label>
              <input
                type="text"
                id="question"
                name="question"
                className="question-text"
                required
                value={question.question}
                onChange={(e) => onChange(e.target.name, e.target.value, index)}
                placeholder="Type your question.."
              />
              {question.question === "" && (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  Question can not be empty!
                </p>
              )}
              <label>Option A</label>
              <input
                type="text"
                id="optiona"
                name="optiona"
                className="question-text"
                required
                value={question.optiona}
                onChange={(e) => onChange(e.target.name, e.target.value, index)}
                placeholder="option"
              />
              {question.optiona === "" && (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  Option A can not be empty!
                </p>
              )}
              <label>Option B</label>
              <input
                type="text"
                id="optionb"
                name="optionb"
                className="question-text"
                required
                value={question.optionb}
                onChange={(e) => onChange(e.target.name, e.target.value, index)}
                placeholder="option"
              />
              {question.optionb === "" && (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  Option B can not be empty!
                </p>
              )}
              <label>Option C</label>
              <input
                type="text"
                id="optionc"
                name="optionc"
                className="question-text"
                required
                value={question.optionc}
                onChange={(e) => onChange(e.target.name, e.target.value, index)}
                placeholder="option"
              />
              {question.optionc === "" && (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  Option C can not be empty!
                </p>
              )}
              <label>Option D</label>
              <input
                type="text"
                id="optiond"
                name="optiond"
                className="question-text"
                required
                value={question.optiond}
                onChange={(e) => onChange(e.target.name, e.target.value, index)}
                placeholder="option"
              />
              {question.optiond === "" && (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  Option D can not be empty!
                </p>
              )}
              <div style={{ display: "flex" }}>
                <label
                  style={{
                    marginRight: "30px",
                    marginTop: "15px",
                    fontSize: "20px",
                  }}
                >
                  Select Correct Option:{" "}
                </label>
                <Select
                  options={options}
                  defaultValue={{
                    value: question.answer,
                    label: question.answer,
                  }}
                  onChange={(e) => onChangeSelect(e, index)}
                />
              </div>
              {question.answer === "" && (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  Correct Answer Should Be Selected!
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ width: "600px", margin: "auto" }}>
        <button className="add-new" onClick={addNewQuestion}>
          Add New Question
        </button>
        <button id="submit" name="submit" onClick={saveAllQuestions}>
          Save All Questions
        </button>
      </div>
    </div>
  );
};

export default SetQuestions;
