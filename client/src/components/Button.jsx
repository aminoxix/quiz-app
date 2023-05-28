import React from "react";

const Button = ({ handleClick, className, disabled, icon, innerText }) => {
  return (
    <button onClick={handleClick} className={className} disabled={disabled}>
      <div className="flex gap-2 justify-center">
        {icon}
        {innerText}
      </div>
    </button>
  );
};

export default Button;
