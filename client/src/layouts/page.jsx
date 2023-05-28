import React from "react";

const PageLayout = ({ children }) => {
  return (
    <>
      <nav></nav>
      <div className="relative">{children}</div>
    </>
  );
};

export default PageLayout;
