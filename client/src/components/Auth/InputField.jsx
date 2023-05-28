import React from "react";

const InputField = ({
  name,
  value,
  handleChange,
  placeholder,
  type,
  frontIcon,
  bottomIcon,
  className,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="relative">
        <input
          type={type}
          name={name}
          id={name}
          className={`peer w-full h-11 border-2 border-gray-400 focus:outline-none focus:border-accent focus:text-brand rounded-md ${className}`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <span className="absolute top-0 left-2 peer-focus:text-accent peer-placeholder-shown:text-slate-400">
          {frontIcon}
        </span>
        <span className="absolute top-0 right-2">{bottomIcon}</span>
      </label>
    </div>
  );
};

export default InputField;
