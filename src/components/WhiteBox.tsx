import React from "react";
import cn from "classnames";

export type WhiteBoxProps = {
  children: React.ReactNode;
  className?: string;
};

const WhiteBox = ({ children, className, ...rest }: WhiteBoxProps) => {
  return (
    <div
      {...rest}
      className={cn("w-full bg-white p-4 shadow rounded-xl", className)}
    >
      {children}
    </div>
  );
};
export default WhiteBox;
