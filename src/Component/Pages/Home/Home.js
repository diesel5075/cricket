// import React, { useState } from "react";
import "./Home.css";
import Scrore from "../../Score/Scrore";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  // const notify = () => toast("Wow so easy!");
  return (
    <>
      {/* <button onClick={notify}>Notify!</button>
      <ToastContainer /> */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="score-num">
              <Scrore />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
