"use client"
import React from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const ShowPassword = (props) => {
  return (
    <div
      onClick={() => props.setshow(!props.show)}
      className="absolute top-1/2 right-3 cursor-pointer"
    >
      {!props.show ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
    </div>
  );
};

export default ShowPassword;
