import React from "react";

const Header = ({
  children,
  ...props
}: {
  children: string | React.ReactNode;
}) => {
  return (
    <h1
      {...props}
      className="border-b-2 pb-2 mb-8 font-medium text-2xl border-b-stone-400 "
    >
      {children}
    </h1>
  );
};

export default Header;
