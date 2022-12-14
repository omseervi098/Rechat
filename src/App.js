import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import userData from "./components/dummy";

function App() {
  return (
    <div className="App">
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
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/chat" element={<Layout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
