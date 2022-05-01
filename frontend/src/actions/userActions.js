import axios from "axios";
import { setValue } from "../utils/CookieService";

export const login = async (email, password, history, errorOccured) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/auth/login",
      { email, password },
      config
    );
    setValue("userInfo", JSON.stringify(data));
    history.push("/");
  } catch (error) {
    console.log(error);
    errorOccured(error);
  }
};

export const register = async (
  name,
  email,
  password,
  history,
  errorOccured
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/auth/register",
      { name, email, password },
      config
    );
    setValue("userInfo", JSON.stringify(data));
    history.push("/");
  } catch (error) {
    console.log(error);
    errorOccured(error);
  }
};
