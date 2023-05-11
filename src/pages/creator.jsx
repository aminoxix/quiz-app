import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import EmojiPicker from "emoji-picker-react";
import Button from "../components/Button";
import DisplayQuestion from "../components/DisplayQuestion";

const Creator = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("📝");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [questions, setQuestion] = useState([
    {
      id: Math.floor(Math.random() * 1000),
      question: "What is the full form of JS?",
      isSelected: false,
      options: [
        {
          id: Math.floor(Math.random() * 1000),
          isCorrect: true,
          option: "JavaScript",
        },
        {
          id: Math.floor(Math.random() * 1000),
          isCorrect: false,
          option: "Just Script",
        },
        {
          id: Math.floor(Math.random() * 1000),
          isCorrect: false,
          option: "Java Scripting",
        },
        {
          id: Math.floor(Math.random() * 1000),
          isCorrect: false,
          option: "Java of Script",
        },
      ],
    },
    {
      id: Math.floor(Math.random() * 1000),
      question: "What is the full form of TS?",
      isSelected: false,
      options: [
        {
          id: Math.floor(Math.random() * 1000),
          isCorrect: true,
          option: "TypeScript",
        },
        {
          id: Math.floor(Math.random() * 1000),
          isCorrect: false,
          option: "Type Script",
        },
        {
          id: Math.floor(Math.random() * 1000),
          isCorrect: false,
          option: "Type Scripting",
        },
        {
          id: Math.floor(Math.random() * 1000),
          isCorrect: false,
          option: "Type of Script",
        },
      ],
    },
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state?.formData || undefined;

  useEffect(() => {
    !location.state?.formData.title && navigate("/");
  }, [formData]);

  const selectSection = (index) => () => {
    setSelectedQuestionIndex(index);
  };

  const handleScroll = () => {
    setQuestion((prev) => {
      const updatedQuestion = prev.map((question, index) => {
        if (index === selectedQuestionIndex) {
          return {
            ...question,
            isSelected: true,
          };
        } else {
          return {
            ...question,
            isSelected: false,
          };
        }
      });

      setSelectedQuestionIndex(
        selectedQuestionIndex < questions.length - 1
          ? selectedQuestionIndex + 1
          : 0
      );

      return updatedQuestion;
    });
  };

  const addQuestion = () => {
    return setQuestion((prev) => [
      ...prev,
      {
        id: Math.floor(Math.random() * 1000),
        question: "Enter new quiz question here...",
        isSelected: false,
        options: [
          {
            id: Math.floor(Math.random() * 1000),
            isCorrect: true,
            option: "+ Add Option",
          },
        ],
      },
    ]);
  };

  return (
    <div className="flex w-screen h-screen flex-col font-poppins">
      <nav className="flex flex-col gap-2 inset-0 p-2 h-auto justify-between bg-brand">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex gap-3 items-center z-0">
              <button
                className="material-symbols-rounded text-xl text-white"
                onClick={() => navigate("/")}
              >
                arrow_back_ios
              </button>
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    setIsEmojiPickerOpen((prev) => !prev);
                  }}
                  className="text-3xl"
                >
                  {selectedEmoji}
                </button>
              </div>
              <div className="flex flex-col">
                <div className="text-xl 2xl:text-2xl xl:text-2xl text-white">
                  {formData?.title?.toUpperCase()}
                </div>
                <div className="text-xs break-words text-slate-400">
                  {formData?.description}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center z-0">
            <button
              icon={<span className="material-symbols-rounded">analytics</span>}
              onClick={() => {}}
              className="flex gap-2 text-accent"
            >
              <span className="material-symbols-rounded">analytics</span>
              View
            </button>
            <Button
              icon={<span className="material-symbols-rounded">publish</span>}
              innerText="Publish"
              handleClick={() => {
                console.log("clicked");
              }}
              className="h-11 hover:bg-teal-600 w-auto"
            />
          </div>
        </div>
        {isEmojiPickerOpen && (
          <div className="z-20">
            <EmojiPicker
              onEmojiClick={(emojiObject, event) => {
                setSelectedEmoji(emojiObject.emoji);
                setIsEmojiPickerOpen(false);
              }}
            />
          </div>
        )}
      </nav>
      <div className="flex flex-col flex-1 bg-brand p-3 text-white z-0">
        <div className="flex flex-1 gap-4 justify-between">
          <div className="flex flex-col">
            {questions.map((question, index) => (
              <div
                className={`flex flex-col border-l-4 h-11 ${
                  index === selectedQuestionIndex
                    ? "border-white"
                    : "border-[#4638B3]"
                }`}
                key={question.id}
              >
                <button
                  onClick={selectSection(index)}
                  className="flex justify-center items-center px-2 h-11"
                >
                  Section {index + 1}
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col flex-1 items-center py-[6px]">
            <DisplayQuestion
              question={questions[selectedQuestionIndex]}
              setQuestion={setQuestion}
              key={selectedQuestionIndex}
              selectedQuestionIndex={selectedQuestionIndex}
            />
          </div>
        </div>
        <div className="inline-flex flex-col">
          <div className="flex justify-between items-center">
            <div className=" w-full border-b border-accent border-dashed flex mx-2"></div>
            <button
              className="flex justify-center items-center text-3xl bg-accent rounded-full p-2 w-9 h-9 2xl:w-11 2xl:h-11 hover:bg-teal-600"
              onClick={addQuestion}
            >
              +
            </button>
          </div>
          <button
            className="flex justify-start text-accent items-start"
            onClick={handleScroll}
          >
            <span className="material-symbols-rounded">expand_more</span>
            <span>Scroll</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creator;
