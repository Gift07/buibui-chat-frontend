import { useEffect, useState, Fragment } from "react";
import axiosInstance from "../axios";

const Conversation = ({ conv, currentUser }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const friendId = conv.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance("/accounts/friends/" + friendId);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getUser();
  }, [currentUser, conv]);

  return (
    <Fragment>
      {loading ? (
        <div className="py-2 h-10 flex gap-x-2 bg-gray-100 rounded-lg px-1 my-1 border border-gray-200 animate-pulse" />
      ) : user === null ? (
        <div className="py-2 flex gap-x-2 bg-gray-100 rounded-lg px-1 my-1 border border-gray-200 animate-pulse" />
      ) : (
        user && (
          <div className="py-2 flex gap-x-2 bg-gray-100 rounded-lg px-1 my-1 border border-gray-200">
            <img
              src={user.thumbnail}
              alt="profile"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="w-full">
              <div className="w-full flex items-center justify-between text-xs mb-1">
                <div className="font-semibold">{user.user.username}</div>
                <div className="text-purple-500 text-xs font-medium">
                  11: 30pm
                </div>
              </div>
              <div className="w-full flex items-center justify-between text-xs">
                <div className="w-10/12">Mollit nulla sint tempor</div>
                <div className="h-4 w-4 flex items-cnter justify-center text-white rounded-full bg-purple-500">
                  2
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
};

export default Conversation;
