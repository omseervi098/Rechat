import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import { AuthContext } from "./context/Auth";
function App() {
  //State to control loader
  const [loading, setLoading] = useState(false);
  //Get current user from context
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* Route for login and dashboard page */}
            <Route
              index
              element={
                !currentUser ? (
                  <Login loading={loading} setLoading={setLoading} />
                ) : (
                  <Layout />
                )
              }
            />
            <Route
              path="login"
              element={<Login loading={loading} setLoading={setLoading} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
