import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import "./App.css";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

import { Edit, Book } from "react-feather";
import { Link } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="inset-0 h-screen bg-brand flex justify-center items-center gap-4 p-2">
      <Button
        className="w-44"
        handleClick={openModal}
        icon={<Edit />}
        innerText="Create Quiz"
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <form className="w-full flex flex-col gap-4 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col gap-2">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="shadow-sm w-full sm:text-sm h-11 border border-gray-300 rounded-md px-2"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Enter a title"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="shadow-sm focus:ring-brand focus:border-brand block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Enter a description..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      className="w-auto bg-slate-400"
                      handleClick={closeModal}
                      innerText="Cancel"
                      type="button"
                    />
                    <Link
                      to={formData.title && "/creator"}
                      state={{ formData }}
                      className={`bg-accent text-white px-4 py-3 font-medium rounded-md w-auto ${
                        formData.title ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Create
                    </Link>
                  </div>
                </form>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Button
        className="w-44"
        handleClick={() => navigate("/library")}
        icon={<Book />}
        innerText="Library"
      />
    </div>
  );
}
