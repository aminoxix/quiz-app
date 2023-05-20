import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.handleClick}
      className={`bg-accent text-white px-4 py-3 font-medium rounded-md w-36 ${props.className}`}
    >
      <div className="flex gap-2 justify-center">
        {props.icon}
        {props.innerText}
      </div>
    </button>
  );
};

export default Button;
