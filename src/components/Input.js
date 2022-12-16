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
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
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
