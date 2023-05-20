import React, { useState, useEffect } from "react";

const DisplayOption = ({ setQuestion, selectedQuestionIndex, option }) => {
  const [isClickedToEditOption, setIsClickedToEditOption] = useState(false);

  function handleKeyDown(event) {
    if (event.key === "Escape" || event.key === "Enter") {
      setIsClickedToEditOption(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.addEventListener("keydown", handleKeyDown);
    };
  });

  const deleteOption = (id) => () => {
    setQuestion((prev) => {
      return prev.map((question, index) => {
        if (index === selectedQuestionIndex) {
          return {
            ...question,
            options: question.options.filter((option) => option.id !== id),
          };
        } else {
          return question;
        }
      });
    });
  };

  const editOption = (id) => (event) => {
    setQuestion((prev) => {
      return prev.map((question, index) => {
        if (index === selectedQuestionIndex) {
          return {
            ...question,
            options: question.options.map((option) => {
              if (option.id === id) {
                return {
                  ...option,
                  option: event.target.value || option.option,
                };
              } else {
                return option;
              }
            }),
          };
        } else {
          return question;
        }
      });
    });
  };

  const handleCorrectOptionClick = (id) => () => {
    setQuestion((prev) => {
      return prev.map((question, index) => {
        if (index === selectedQuestionIndex) {
          return {
            ...question,
            options: question.options.map((option) => {
              if (option.id === id) {
                return {
                  ...option,
                  isCorrect: true,
                };
              } else {
                return {
                  ...option,
                  isCorrect: false,
                };
              }
            }),
          };
        } else {
          return question;
        }
      });
    });
  };

  return (
    <div key={option.id} className="flex gap-2 items-center">
      <input
        onClick={handleCorrectOptionClick(option.id)}
        type="radio"
        checked={option.isCorrect}
        className="cursor-pointer"
      />
      <div className="flex flex-1 justify-between">
        {isClickedToEditOption ? (
          <input
            className="rounded w-full bg-[#392BB6] outline-none"
            value={option.option}
            onChange={editOption(option.id)}
          />
        ) : (
          <div
            onClick={() => {
              setIsClickedToEditOption((prev) => !prev);
            }}
            className={`${
              option.option === "+ Add Option" ? "text-gray-400" : "text-white"
            }`}
          >
            {option.option}
          </div>
        )}
        {option.option !== "+ Add Option" && (
          <div
            className="text-red-600 cursor-pointer"
            onClick={deleteOption(option.id)}
          >
            ✘
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayOption;
