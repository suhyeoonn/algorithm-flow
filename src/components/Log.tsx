import React, { ReactNode } from "react";

export enum Type {
  "sum == N",
  "sum > N",
  "sum < N",
}
interface Props {
  type?: Type;
  log?: string;
  comment?: string;
  children: ReactNode;
}
const Log = ({ children }: Props) => {
  return (
    <div className="flex gap-2 text-gray-300">
      {/* {chip}
      <span>{log}</span>
      <span className="text-gray-500">
        {"//"}
        {comment}
      </span> */}
      {children}
    </div>
  );
};

export default Log;
