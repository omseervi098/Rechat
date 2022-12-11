import React from "react";
import Left from "./Left";
import Right from "./Right";
import Layout from "./Layout";
function Main() {
  return (
    <div className="App">
      <div className="main container">
        <div className="row">
          <div className="col-3">
            <Layout />
          </div>
          <div className="col-9">
            <Right />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
