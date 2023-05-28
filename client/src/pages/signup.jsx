import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import AuthLayout from "../layouts/auth";
import { postSignUpFormData } from "../utils/requests";

import InputField from "../components/Auth/InputField";
import Button from "../components/Button";

const SignUp = () => {
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const { mutate, isLoading, isError } = useMutation(postSignUpFormData, {
    onSuccess: (successData) => {
      if (successData !== undefined) {
        localStorage.setItem("authToken", successData.token);
        navigate("/dashboard");
      } else {
        setMessage("Invalid credentials!");
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
    if (!formData.full_name || !formData.email || !formData.password) {
      setMessage("Some fields are missing!");
    } else {
      mutate({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold">Create an account</h1>
      <p className="text-lg font-medium">
        Already have an account?{" "}
        <Link to={"/login"} className="text-brand font-semibold">
          Sign in
        </Link>
      </p>
      <form className="w-full flex flex-col gap-8 justify-center">
        <InputField
          name="full_name"
          value={formData.full_name}
          handleChange={handleChange}
          placeholder="Full Name"
          type="text"
          className="px-10"
          frontIcon={
            <span className="material-symbols-rounded focus:text-accent material-symbols-filled-outlined">
              person
            </span>
          }
        />
        <InputField
          name="email"
          value={formData.email}
          handleChange={handleChange}
          placeholder="Email"
          type="email"
          className="px-10"
          frontIcon={
            <span className="material-symbols-rounded focus:text-accent material-symbols-filled-outlined">
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
            innerText="Sign Up"
            type="submit"
            disabled={message}
          />
        </div>
        {/* while integrate OAuth support */}
        {/* <div class="flex items-center gap-x-2">
          <div class="grow border-gray-300 border-t-2"></div>
          <small class="">OR</small>
          <div class="grow border-gray-300 border-t-2"></div>
        </div> */}
      </form>
    </AuthLayout>
  );
};

export default SignUp;
