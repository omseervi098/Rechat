import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/Chat";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
function Input() {
  // This is input component which will take input from user and send message
  const [text, setText] = useState(""); //text state to store text
  const { currentUser } = useContext(AuthContext); //currentUser is user state fetched from AuthContext
  const { data } = useContext(ChatContext); //data is data state fetched from ChatContext
  const handleSend = async () => {
    //send message
    //update messages in chats collection
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    //update lastMessage and date in userChats collection of current user and other user
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    //reset text state
    setText("");
  };
  return (
    <div className="send-message ">
      <input
        type="text"
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <div className="send-message-icon">
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <i className="fas fa-paperclip"></i>
        </label>
        <div className="smile">
          <i className="fas fa-smile"></i>
        </div>
        <button onClick={handleSend}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
export default Input;
