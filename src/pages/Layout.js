import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
function Layout(props) {
  return (
    <div className="layout">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Layout;
