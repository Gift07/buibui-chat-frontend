import React, { useEffect, useState, useRef } from "react";
import {
  BsFillTelephoneFill,
  BsFillCameraVideoFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";

const HomeOutlet = ({
  currentchat,
  messages,
  handleSubmit,
  newMessage,
  setNewMessage,
  isTyping,
  setIsTyping,
}) => {
  const [, setWindowHeight] = useState(window.innerHeight);
  const scrollRef = useRef();
  console.log(currentchat);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-screen">
      {currentchat === null ? (
        <div>Select a convo to continue</div>
      ) : (
        <div className="w-full h-screen">
          {/* top bar */}
          <div className="w-full h-12 bg-white px-3">
            <div className="h-full flex items-center">
              <img
                src={
                  "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                }
                alt="profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="w-full flex items-center justify-between pl-2">
                <div className="text-xs">
                  <div className="font-medium">Gift</div>
                  <div className="text-gray-500 flex items-center gap-x-1">
                    <div className="h-1 w-1 bg-red-500 rounded-full" />
                    last seen recently
                  </div>
                </div>
                <div className="flex gap-x-3 text-gray-400">
                  <BsFillTelephoneFill />
                  <BsFillCameraVideoFill />
                  <BiDotsHorizontalRounded />
                </div>
              </div>
            </div>
          </div>
          {/* text messages container */}
          <div className="w-full  h-[calc(100vh-104px)]">
            <div className="w-full h-full overflow-y-scroll px-4 pt-2">
              <div className="w-full flex flex-col px-12">
                {/* individual messages */}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    ref={scrollRef}
                    className={`${
                      m.sender !== localStorage.getItem("id")
                        ? "bg-purple-200 self-start"
                        : "bg-gradient-to-l from-pink-700 to-purple-600 self-end text-white"
                    }  p-2 max-w-sm  rounded-lg my-1 text-xs`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="h-14 w-full bg-white flex items-center justify-center py-1">
            <div className="bg-gray-200 h-full w-8/12 flex rounded-xl">
              <div className="h-full flex items-center justify-center text-purple-500 px-2">
                <ImAttachment />
              </div>
              <input
                className="w-full h-full outline-none text-xs bg-gray-200"
                placeholder="Enter a message"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                onKeyDown={() => setIsTyping(true)}
                onKeyUp={() => setIsTyping(false)}
              />
              <div className="h-full flex items-center justify-center text-purple-600 px-2">
                <BsEmojiSmile />
              </div>
            </div>
            <div
              onClick={() => handleSubmit()}
              className="h-10 w-10 flex items-center justify-center bg-purple-500 text-white rounded-full ml-2"
            >
              <IoSendSharp />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeOutlet;
