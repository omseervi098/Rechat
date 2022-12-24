import Message from "./Message";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/Chat";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
function Messages() {
  // This is messages component which will show all messages of current conversation
  const [messages, setMessages] = useState([]); //state to store all messages of current conversation
  const { data } = useContext(ChatContext); //data is data state fetched from ChatContext
  useEffect(() => {
    //onSnapshot will listen to changes in messages of current conversation
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      //setMessages will set messages state with messages of current conversation
      doc.exists && doc.data() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages !== undefined &&
        //Rendering all messages of current conversation
        messages.map((m) => {
          return <Message key={m.id} message={m} />;
        })}
    </div>
  );
}
export default Messages;
