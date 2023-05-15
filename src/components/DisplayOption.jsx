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

  return (
    <div key={option.id} className="flex gap-2 items-center">
      <input type="radio" onChange={() => {}} />
      <div className="flex flex-1 justify-between">
        {isClickedToEditOption ? (
          <input
            className="rounded w-full text-white bg-[#392BB6] outline-none"
            value={option.option}
            onChange={editOption(option.id)}
          />
        ) : (
          <span
            onClick={() => {
              setIsClickedToEditOption((prev) => !prev);
            }}
          >
            {option.option}
          </span>
        )}
        <div className="text-red-600" onClick={deleteOption(option.id)}>
          ✘
        </div>
      </div>
    </div>
  );
};

export default DisplayOption;
