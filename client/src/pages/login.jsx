import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import AuthLayout from "../layouts/auth";
import { postLoginFormData } from "../utils/requests";

import InputField from "../components/Auth/InputField";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isLoading, isError } = useMutation(postLoginFormData, {
    onSuccess: (successData) => {
      if (successData !== undefined && successData.token !== undefined) {
        localStorage.setItem("authToken", successData.token);
        navigate("/dashboard");
      } else {
        setMessage(successData);
      }
    },
  });

  if (isLoading) {
    console.log("Loading...");
  }
  if (isError) {
    console.log("Something went wrong!");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("Some fields are missing!");
    } else {
      mutate({
        email: formData.email,
        password: formData.password,
      });
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">Sign In</h1>
      <p className="text-lg font-medium">
        Don't have an account?{" "}
        <Link to={"/signup"} className="text-brand font-semibold">
          Sign Up
        </Link>
      </p>
      <form className="w-full flex flex-col gap-8 justify-center">
        <InputField
          name="email"
          value={formData.email}
          handleChange={handleChange}
          placeholder="Email"
          type="email"
          className="px-10"
          frontIcon={
            <span className="material-symbols-rounded material-symbols-filled-outlined">
              mail
            </span>
          }
        />
        <InputField
          name="password"
          value={formData.password}
          handleChange={handleChange}
          placeholder="Password"
          type={isPasswordVisible ? `text` : `password`}
          className="px-10"
          frontIcon={
            <span className="material-symbols-rounded material-symbols-filled-outlined">
              key
            </span>
          }
          bottomIcon={
            <span
              className="material-symbols-rounded"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? `password` : `pin`}
            </span>
          }
        />
        <div className="flex flex-col gap-2 text-center">
          {message && setTimeout(() => setMessage(""), 3000) && (
            <p className="text-red-500 text-sm">{message}</p>
          )}

          <Button
            className="bg-brand text-white px-4 py-3 font-medium rounded-md w-auto"
            handleClick={handleFormSubmit}
            innerText="Login"
            type="submit"
            disabled={message}
          />
        </div>
        {/* while integrate OAuth support */}
        {/* <div class="flex items-center gap-x-2">
          <div class="grow border-gray-300 border-t-2"></div>
          <small class="text-gray-400">OR</small>
          <div class="grow border-gray-300 border-t-2"></div>
        </div> */}
      </form>
    </AuthLayout>
  );
};

export default Login;
