import Messages from "./Messages";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/Chat";
function Chat() {
  //This is right side chat component which will show messages and input field
  const { data } = useContext(ChatContext); //data is chat state fetched from ChatContext
  const [userLen, setUserLen] = useState(null); //Created userLen state to check if user is having conversation or not

  useEffect(() => {
    //This useEffect will run when user state changes
    setUserLen(Object.keys(data.user).length); //it set userLen state to length of user object
  }, [data.user]);

  return (
    <div className="chat">
      {userLen !== 0 ? (
        //If user is having conversation than show messages and input field
        <>
          <div className="chatInfo">
            <span>{data.user?.displayName}</span>
            <div className="chatIcons">
              <i className="fas fa-video"></i>
              <i className="fas fa-phone"></i>
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div>
          <Messages />
          <Input />
        </>
      ) : (
        //If user is not having conversation than show welcome message
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
          <img
            src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm422-073.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=ef48caa87980815f77343e682d6324ee"
            alt=""
            className="img-fluid object-fit-cover h-100 w-100"
          />
          <div className="position-absolute text-center">
            <h1 className="font-weight-bolder ">
              Welcome to <span className="text-danger">Rechat</span>
            </h1>
            <div className="font-weight-light">
              Please select a chat to start messaging
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Chat;
