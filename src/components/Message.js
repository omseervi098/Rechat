import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/Chat";
function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  let date = new Date(message.date.seconds * 1000);
  let finaldate = date.toLocaleString().split(",")[1];

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />

        <span>{finaldate}</span>
      </div>
      <div className="messageText">
        <p>{message.text}</p>
      </div>
    </div>
  );
}
export default Message;
