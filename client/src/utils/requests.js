import axios from "axios";
import { quizAPI, loginAPI, signupAPI } from "../api";

export const postSignUpFormData = async (user) => {
  const response = await fetch(signupAPI, {
    method: "POST",
    body: JSON.stringify({
      full_name: user.full_name,
      email: user.email,
      password: user.password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await response.json();
  if (response.status === 400) {
    return data.message;
  }
  return data;
};

export const postLoginFormData = async (user) => {
  const response = await fetch(loginAPI, {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await response.json();
  if (response.status === 400) {
    return data.message;
  }
  return data;
};

export const getQuizzes = async () => {
  try {
    const response = await axios.get(quizAPI, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    console.log(response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error; // Optionally, you can handle or propagate the error as needed
  }
};
