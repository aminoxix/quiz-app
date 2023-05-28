import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PageLayout from "../layouts/page";

import EmojiPicker from "emoji-picker-react";
import Button from "../components/Button";
import DisplayQuestion from "../components/Creator/DisplayQuestion";

const Creator = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("📝");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
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
    !location.state?.formData.title ||
      // need to remove localstorage from here cuz it will be reqd. for main page layout
      (!localStorage.getItem("authToken") && navigate("/dashboard"));
  }, [formData]);

  const selectSection = (index) => () => {
    setSelectedQuestionIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
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
    <PageLayout>
      <div className="flex w-screen h-screen flex-col font-poppins">
        <nav className="flex flex-col gap-2 inset-0 p-2 h-auto justify-between bg-brand">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex gap-3 items-center">
                <button
                  className="material-symbols-rounded text-xl text-white"
                  onClick={() => navigate("/dashboard")}
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
            <div className="flex gap-4 justify-between 2xl:visible xl:visible lg:visible md:visible sm:invisible xs:invisible">
              <Button
                icon={
                  <span className="material-symbols-rounded">analytics</span>
                }
                onClick={() => {}}
                className="text-accent px-3 py-2"
                innerText="View"
              />
              <Button
                icon={<span className="material-symbols-rounded">publish</span>}
                innerText="Publish"
                handleClick={() => {
                  console.log("clicked");
                }}
                className="h-11 px-3 py-2 text-white font-medium rounded-md hover:bg-teal-600 bg-accent"
              />
              <Button
                icon={
                  <span className="material-symbols-rounded">exit_to_app</span>
                }
                innerText="Sign Out"
                handleClick={handleLogout}
                className="h-11 px-3 py-2 hover:bg-red-500 bg-red-600 text-white font-medium rounded-md"
              />
            </div>
            <div className="flex flex-col items-end justify-center md:hidden">
              <button
                onClick={() => setIsNavOpen((prev) => !prev)}
                className="material-symbols-rounded text-white"
              >
                menu
              </button>
            </div>
          </div>
          {isNavOpen && (
            <div className="flex flex-col gap-1 justify-center items-start">
              <div className="flex w-full justify-end">
                <Button
                  icon={
                    <span className="material-symbols-rounded">analytics</span>
                  }
                  onClick={() => {}}
                  className="text-accent w-1/2"
                  innerText="View"
                />
                <Button
                  icon={
                    <span className="material-symbols-rounded">publish</span>
                  }
                  innerText="Publish"
                  handleClick={() => {
                    console.log("clicked");
                  }}
                  className="h-11 w-1/2 text-white font-medium rounded-md hover:bg-teal-600 bg-accent"
                />
              </div>
              <Button
                icon={
                  <span className="material-symbols-rounded">exit_to_app</span>
                }
                innerText="Sign Out"
                handleClick={handleLogout}
                className="h-11 w-full hover:bg-red-500 bg-red-600 text-white font-medium rounded-md"
              />
            </div>
          )}
          {isEmojiPickerOpen && (
            <div className="flex justify-center">
              <EmojiPicker
                onEmojiClick={(emojiObject, event) => {
                  setSelectedEmoji(emojiObject.emoji);
                  setIsEmojiPickerOpen(false);
                }}
              />
            </div>
          )}
        </nav>
        <div className="flex flex-col flex-1 bg-brand p-3 text-white">
          <div className="flex flex-1 gap-4 justify-between items-center">
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
                setSelectedQuestionIndex={setSelectedQuestionIndex}
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
              className="flex justify-start text-accent items-start w-auto"
              onClick={handleScroll}
            >
              <span className="material-symbols-rounded">expand_more</span>
              <span>Scroll</span>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Creator;
