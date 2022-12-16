import Messages from "./Messages";
import Input from "./Input";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/Chat";
function Chat() {
  const { data } = useContext(ChatContext);
  //check data.user is not empty
  const [userLen, setUserLen] = useState(null);

  useEffect(() => {
    setUserLen(Object.keys(data.user).length);
    console.log(data.user);
  }, [data.user]);

  return (
    <div className="chat">
      {userLen !== 0 ? (
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
