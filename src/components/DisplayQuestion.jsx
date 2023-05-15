import React, { useState, useEffect } from "react";
import DisplayOption from "./DisplayOption";

const DisplayQuestion = ({ question, setQuestion, selectedQuestionIndex }) => {
  const [isClickedToEditQuestion, setIsClickedToEditQuestion] = useState(false);

  const editQuestion = (event) => {
    setQuestion((prev) => {
      return prev.map((question, index) => {
        if (index === selectedQuestionIndex) {
          return {
            ...question,
            question: event.target.value || question.question,
          };
        } else {
          return question;
        }
      });
    });
  };

  function handleKeyDown(event) {
    if (event.key === "Escape" || event.key === "Enter") {
      setIsClickedToEditQuestion(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.addEventListener("keydown", handleKeyDown);
    };
  });

  const lastOption = question.options[question.options.length - 1];

  const addOption = () => {
    setQuestion((prev) => {
      return prev.map((question, index) => {
        if (index === selectedQuestionIndex) {
          {
            return {
              ...question,
              options: [
                ...question.options,
                {
                  id: Math.floor(Math.random() * 10000),
                  option: "+ Add Option",
                  isCorrect: false,
                },
              ],
            };
          }
        } else {
          return question;
        }
      });
    });
  };

  return (
    <div className="w-full 2xl:w-1/2 xl:w-1/2">
      <div className="flex bg-[#392BB6] rounded h-auto 2xl:h-60 xl:h-60 p-3">
        <div className="flex flex-col gap-4">
          <div className="clickable-element" onClick={editQuestion}>
            {isClickedToEditQuestion ? (
              <input
                type="text"
                value={question.question}
                onChange={editQuestion}
                className="rounded w-full text-white bg-[#392BB6] outline-none"
              />
            ) : (
              <div onClick={() => setIsClickedToEditQuestion((prev) => !prev)}>
                {question.question}
              </div>
            )}
          </div>
          <div>
            {question.options.map((option) => (
              <DisplayOption
                option={option}
                selectedQuestionIndex={selectedQuestionIndex}
                setQuestion={setQuestion}
                key={option.id}
              />
            ))}
            {lastOption.option !== "+ Add Option" && (
              <div className="flex gap-2 items-center">
                <input type="radio" />
                <button
                  className="text-gray-400 cursor-text"
                  onClick={addOption}
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayQuestion;
