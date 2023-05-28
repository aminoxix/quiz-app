import React from "react";

import { useQuery } from "@tanstack/react-query";

import { getQuizzes } from "../utils/requests";

const Library = () => {
  const getQuizzesQuery = useQuery(["quizzes"], getQuizzes);

  if (getQuizzesQuery.isLoading) {
    console.log("Loading...");
    return null;
  }
  if (getQuizzesQuery.isError) {
    console.log("Something went wrong!");
    return null;
  }

  return (
    <div>
      {getQuizzesQuery.data.map((quiz) => (
        // design this & make a separate div element to add new quiz which take user to /creator
        <div key={quiz.id}>{quiz.title}</div>
      ))}
    </div>
  );
};

export default Library;
