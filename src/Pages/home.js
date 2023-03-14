import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../Context/auth";
import { IoIosSearch } from "react-icons/io";
import { HiPlusSm } from "react-icons/hi";
import Conversation from "../Components/conversation";
import HomeOutlet from "./Outlet/homeOutlet";
import axiosInstance from "../axios";
import { io } from "socket.io-client";
import Adduser from "../Components/adduser";

const Home = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { GetAccount, acount } = useContext(AuthContext);
  const [adduser, setAdduser] = useState(false);
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // user typing
  useEffect(() => {
    // Send a "user is typing" message when the user starts typing
    socket.current.emit("userTyping", true);

    // Send a "user has stopped typing" message when the user stops typing
    socket.current.emit("userTyping", false);
    // user typing
    socket.current.on("userTyping", (isTyping) => {
      setIsTyping(isTyping);
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", localStorage.getItem("id"));
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     account.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, []);

  useEffect(() => {
    const getOwnAccount = async () => {
      try {
        const { data } = await axiosInstance.get("/accounts/myaccount");
        localStorage.setItem("id", data._id);
        setAccount(data);
      } catch (e) {
        setError(e);
      }
    };

    getOwnAccount();
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosInstance.get(
          "/conversation/" + localStorage.getItem("id")
        );
        setConversations(res.data);
      } catch (err) {
        setError(err);
      }
    };
    getConversations();
  }, [account]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance.get(
          "/messages/available/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async () => {
    const message = {
      sender: localStorage.getItem("id"),
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== localStorage.getItem("id")
    );

    socket.current.emit("sendMessage", {
      senderId: localStorage.getItem("id"),
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axiosInstance.post("/messages/create", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const access = localStorage.getItem("access");

  if (!access) return <Navigate to="sign-in" />;
  return (
    <div className="w-screen h-screen relative">
      {adduser && <Adduser adduser={adduser} setAdduser={setAdduser} />}
      <div className="w-full h-screen flex bg-gray-100">
        <div className="w-80 h-screen bg-white">
          <div className="w-80 h-screen fixed bg-white">
            {/* logo */}
            <div className="flex items-center w-full">
              <img
                src="Logo.png"
                alt="logo"
                className="h-16 w-16 object-cover"
              />
              <h1 className="text-lg font-bold">Infinity chats</h1>
            </div>
            {/* logo ends */}
            {/* chats and search */}
            <div className="w-full flex px-3">
              <div className="w-full flex items-center relative">
                <input className="w-full p-2 bg-gray-200 outline-none rounded-xl text-xs border border-gray-300 focus:border-purple-500 absolut pr-3" />
                <div className="absolute right-0 pr-2 text-lg">
                  <IoIosSearch />
                </div>
              </div>
            </div>
            {/* chats and add newchat */}
            <div className="w-full flex flex-col py-2">
              <div className="w-full flex items-center justify-between px-3">
                <div className="flex text-lg font-bold">
                  <h1 classname="text-lg font-bold">Chats</h1>
                </div>
                <div
                  onClick={() => setAdduser(!adduser)}
                  className="p-1 bg-purple-400 text-white rounded-full"
                >
                  <HiPlusSm />
                </div>
              </div>
              <div className="px-3">
                <ul className="flex items-center gap-x-3 uppercase text-sm">
                  <li className="flex items-center gap-x-1">
                    <h1 className="font-semibold">Direct</h1>
                    <div className="h-4 w-4 flex items-center justify-center  text-xs rounded-full bg-purple-500 text-white">
                      12
                    </div>
                  </li>
                  <li>Group</li>
                  <li>Public</li>
                </ul>
              </div>
            </div>
            {/* conversations */}
            <div className="w-full px-3 overflow-y-scroll h-[33rem]">
              {conversations.map((c, i) => (
                <div key={i} onClick={() => setCurrentChat(c)}>
                  <Conversation
                    conv={c}
                    currentUser={localStorage.getItem("id")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <HomeOutlet
            currentchat={currentChat}
            handleSubmit={handleSubmit}
            messages={messages}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        </div>
        {/* other informations */}
        <div className="w-64 h-screen bg-white self-end px-2 pt-2">
          <div className="w-full rounded-xl bg-gray-200 border border-gray-300">
            <div className="w-full flex items-center justify-center p-2">
              <img
                src={account && account.thumbnail}
                alt="pic"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <h1 className="font-semibold">
                {account && account.user.username}
              </h1>
            </div>
            <div className="w-full flex items-center justify-center">
              <h1 className="text-sm">
                {account && account.user.phone_number}
              </h1>
            </div>
            <div className="w-full flex items-center justify-center my-2">
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/sign-in");
                }}
                className="px-6 py-2 text-xs bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 active:bg-red-700 duration-200"
              >
                Logout
              </button>
            </div>
          </div>
          {/* Online members */}
          <div className="w-full px-2 pt-3">
            <div className="text-lg">
              <h1 className="font-bold">Online Members</h1>
            </div>
            <div className="w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <div className="my-1 flex gap-x-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1560087637-bf797bc7796a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt="profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-xs font-medium">Diane Samwel</h1>
                    <div className="flex items-center gap-x-1">
                      <div className="h-1 w-1 bg-green-500 rounded-full" />
                      <h1 className="text-xs">Online</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
