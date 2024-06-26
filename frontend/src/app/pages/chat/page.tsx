"use client";
import { NavbarWrapper } from "../../components/navbar-wrapper";
import {useChat} from "../../hooks/useChat";
import { useEffect, useRef, useState} from "react";
import Textarea from "react-textarea-autosize";
import ImageUpload from "../../components/image-upload";
import axios from "axios";


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "http://localhost:8000/chat",
  });

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    useEffect(() => {
    const checkFormSubmittable = async () => {
      const response = await axios.get("http://localhost:8000/chat-initialized"); // replace with fetch if you prefer
      setIsFormSubmittable(response.data.data);
    };

    checkFormSubmittable();
  }, []);

  const messageEndRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <NavbarWrapper />
      <div className="mx-auto grid md:grid-cols-2 sm:grid-col-1">
        <div>
          <ImageUpload />
        </div>
        <div>
          <div className="min-h-screen bg-neutral-1000 pt-40">
            {messages.length !== 0 ? (
              <div className="pb-32 pt-5 space-y-5 mx-auto relative">
                {messages.map((message) => (
                  <div key={message.id} className="w-full">
                    {message.role === "user" ? (
                      <div className="flex  gap-x-2">
                        <div className="bg-gray-500 h-12 w-12 rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-full h-full text-white p-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <p className="rounded-lg p-3 w-full border-gray-500 border-2 text-sm">
                          {message.content}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-x-2">
                        <div className="bg-[#005587] h-12 w-12 rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-full h-full text-white p-1"
                          >
                            <path d="M16.5 7.5h-9v9h9v-9z" />
                            <path
                              fillRule="evenodd"
                              d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <p className="rounded-lg p-3 w-full border-[#005587] border-2 text-sm">
                          {message.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full flex justify-center pt-32">
                <h1 className="w-4/5 flex items-center justify-center text-center p-5 font-bold text-3xl">
                  Hi there! 👋 Please ask any questions to our ChatBot below! 😊️
                </h1>
              </div>
            )}

            <div ref={messageEndRef}></div>
            <form
              onSubmit={handleSubmit}
              className="p-5 fixed bottom-0 w-[50%] mx-auto right-0 bg-neutral-1000"
              // p-5 fixed bottom-0 left-0 w-[75%] mx-auto right-0 bg-neutral-1000
            >
              <div className="relative flex items-center">
                <Textarea
                  tabIndex={0}
                  required
                  rows={1}
                  value={input}
                  onChange={handleInputChange}
                  autoFocus
                  placeholder="Tell us what's wrong! 💉🩺"
                  spellCheck={false}
                  className="w-full focus:outline-none  shadow-xl placeholder:text-gray-200 text-sm text-white p-5 pr-16 rounded-xl bg-neutral-600"
                />
                <button
                  type="submit"
                  className="absolute bg-black p-2 rounded-lg right-0 mr-5"
                  disabled={!isFormSubmittable}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
