import React, { useState } from "react";

export default function Login() {
  return (
    <div className=" p-8  h-screen flex items-center justify-center rounded-xl">
      <div className="box border-black border-2 p-8 flex justify-center rounded-lg bg-neutral-200">
        <div className="head flex-col flex text-center">
            <h1 className="font-bold text-black text-3xl p-3 mb-8">LogIn</h1>
            <button className="font-bold text-black bg-white text-lg p-2 px-4 m-2 rounded-3xl">Continue With Google</button>
            <button className="font-bold text-black bg-orange-400 text-lg p-2 m-2 rounded-3xl">SignUp</button>
        </div>
      </div>
    </div>
  );
}
