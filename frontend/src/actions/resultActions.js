import axios from "axios";
import { getValue, setValue } from "../utils/CookieService";

export const setResult = async (playerStats) => {
  try {
    const userInfo = getValue("userInfo");
    const config = {
      headers: {
        "Content-Type": "application/json",
        jwt_token: userInfo.jwtToken,
      },
    };

    const {
      numberOfQuestions,
      numberOfAnsweredQuestions,
      correctAnswers,
      wrongAnswers,
    } = playerStats;

    const { data } = await axios.post(
      "/result/set",
      {
        numberOfQuestions,
        numberOfAnsweredQuestions,
        correctAnswers,
        wrongAnswers,
        userInfo,
      },
      config
    );
  } catch (error) {
    console.log(error);
  }
};

export const getResult = async () => {
  try {
    const userInfo = getValue("userInfo");
    const config = {
      headers: {
        "Content-Type": "application/json",
        jwt_token: userInfo.jwtToken,
      },
    };

    const { data } = await axios.get("/result/get", config);
    console.log("data", data);
    setValue("AllUsers", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentResult = async (id) => {
  try {
    const userInfo = getValue("userInfo");
    const config = {
      headers: {
        "Content-Type": "application/json",
        jwt_token: userInfo.jwtToken,
      },
    };
    console.log("id", id);
    const { data } = await axios.get(`/result/get/${id}`, config);
    console.log("data", data);
    setValue("studentResult", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
