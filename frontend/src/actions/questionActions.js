import axios from "axios";
import { getValue, setValue } from "../utils/CookieService";
import M from "materialize-css";

export const setAllQuestions = async (questions, history) => {
  try {
    const userInfo = getValue("userInfo");
    const config = {
      headers: {
        "Content-Type": "application/json",
        jwt_token: userInfo.jwtToken,
      },
    };
    const { data } = await axios.post("/questions/set", questions, config);
    if (data) {
      M.toast({
        html: "All Questions are Saved!",
        classes: "toast-valid",
        displayLength: 1500,
      });
      history.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = async () => {
  try {
    const userInfo = getValue("userInfo");
    const config = {
      headers: {
        "Content-Type": "application/json",
        jwt_token: userInfo.jwtToken,
      },
    };

    const { data } = await axios.get("/questions/get", config);
    console.log("data", data);
    // setValue("AllUsers", data);
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
