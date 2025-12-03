import React from "react";

const Homepage = () => {
  return (
    <div className="flex justify-center items-center w-lvw h-lvh">
      <div
        className="border-2 
                   border-amber-900
                   m-10 w-200 h-1/2"
      >
        <h1
          className="text-5xl 
                        text-center 
                        m-10 mb-1 
                        major-mono-display-regular"
        >
          <span className="text-amber-800">L</span>ock
          <span className="text-amber-800">I</span>n
        </h1>
        <h2
          className="text-1xl
                        google-sans-flex 
                        lato-regular m-10 mt-0
                        text-center"
        >
          Get Shit Done...
        </h2>
        <div className="justify-center flex items-center">
          <input
            type="password"
            className="block major-mono-display-regular w-1/2 h-10 text-2xl text-center text-amber-400 outline-none border-2 m-"
            placeholder="What is your name??"
          />
        </div>
        <div className="justify-center flex items-center">
          <button className="text-2xl bg-amber-950 w-auto p-2 m-10 ">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
