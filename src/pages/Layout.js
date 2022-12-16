import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
function Layout(props) {
  return (
    <div className="layout">
      <div className="background">
        <img
          alt="background"
          style={{
            position: "fixed",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
          src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
        />
      </div>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Layout;
