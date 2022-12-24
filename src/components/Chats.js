import React, { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/Chat";
function Chats() {
  // This is chats component which will show all active coversation of current user
  const [chats, setChats] = useState([]); //state to store all users which are in conversation with current user
  const { currentUser } = useContext(AuthContext); //currentUser is user state fetched from AuthContext
  const { dispatch } = useContext(ChatContext); //dispatch is dispatch function fetched from ChatContext

  useEffect(() => {
    //this will refetch chats when current user logout and login
    //this will fetch all users which are in conversation with current user
    const getChats = async () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    //Click on user will start conversation by dispatching user to ChatContext
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="chats">
      {/* Rendering all users with whom current user is in conversation and sorted in order with last conversation*/}
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(([id, chat]) => (
          <div
            className="userChat"
            key={id}
            onClick={() => handleSelect(chat.userInfo)}
          >
            <img src={chat.userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat.userInfo.displayName}</span>
              <span>{chat.lastMessage?.text}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
export default Chats;
