import React, { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/Chat";
function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
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
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="chats">
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
