import Message from "./Message";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/Chat";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists && doc.data() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages !== undefined &&
        messages.map((m) => {
          return <Message key={m.id} message={m} />;
        })}
    </div>
  );
}
export default Messages;
