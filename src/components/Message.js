import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/Chat";
function Message({ message }) {
  // This is message component which will show single message
  const { currentUser } = useContext(AuthContext); //currentUser is user state fetched from AuthContext
  const { data } = useContext(ChatContext); //data is data state fetched from ChatContext
  const ref = useRef(); //ref is used to scroll to bottom of messages

  useEffect(() => {
    //scrolling to bottom of messages
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  let date = new Date(message.date.seconds * 1000);
  let finaldate = date.toLocaleString().split(",")[1]; //variable to store date of message
  return (
    <div
      ref={ref}
      //if message is sent by current user then add class owner to message
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
