import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axiosInstance from "../axios";

const Adduser = ({ adduser, setAdduser }) => {
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState(null);
  const handleSearch = async () => {
    try {
      console.log(phone);
      const { data } = await axiosInstance.get(`/accounts/chatting/${phone}`);
      setAccount(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAdd = async () => {
    try {
      const conversation = {
        senderId: localStorage.getItem("id"),
        receiverId: account._id,
      };
      const { data } = await axiosInstance.post(
        "/conversation/addnew",
        conversation
      );
      if (data) {
        setAdduser(!adduser);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-screen h-screen z-50 bg-purple-500 bg-opacity-50 backdrop-blur-md absolute">
      <div className=" flex items-center justify-end px-12">
        <button
          onClick={() => setAdduser(false)}
          className="bg-blue-500 px-3 py-2 m-4 text-white"
        >
          Close
        </button>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white p-2 w-1/2 rounded-xl">
          <div className="w-full flex items-center justify-center">
            <h1 className="font-bold text-xl">Add New chat</h1>
          </div>
          {/* adding a search bar */}
          <div className="w-full flex items-center my-2">
            <div className="w-1/2 h-9 relative">
              <input
                className="w-full h-9 absolute outline-none  p-2 bg-gray-200 border border-gray-300 focus:border-purple-500 rounded-xl text-xs pr-2"
                placeholder="enter a number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div
                onClick={handleSearch}
                className="text-xl absolute right-0 h-9 flex items-center justify-center pr-3"
              >
                <IoIosSearch />
              </div>
            </div>
          </div>
          {/* people */}
          <hr />
          <div className="w-full py-1">
            {account ? (
              <div className="h-16 w-1/2 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-between px-1">
                <div className="w-full flex items-center gap-x-2">
                  <div className="h-10 w-10 bg-yellow-500 rounded-full uppercase flex items-center justify-center text-white">
                    j
                  </div>
                  <div>Gift</div>
                </div>
                <div>
                  <button
                    onClick={handleAdd}
                    className="px-4 py-1 bg-blue-500 rounded-xl text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <div>Enter a collect number</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
