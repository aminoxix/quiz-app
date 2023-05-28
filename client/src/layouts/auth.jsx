import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen inset-0">
      <div className="flex flex-1 items-center justify-center bg-brand">
        <img
          className="w-72 h-72 rounded-xl"
          src="/quizlabs.svg"
          alt="Quizlabs Logo"
        />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center py-20 px-10 xl:px-20 shrink-0 basis-full bg-slate-50 lg:basis-1/2 xl:basis-1/3">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
