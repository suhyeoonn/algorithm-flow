import React from "react";

export enum Type {
  "sum == N",
  "sum > N",
  "sum < N",
}
interface Props {
  type: Type;
  log: string;
  comment: string;
}
const Log = ({ type, log, comment }: Props) => {
  let chip = null;
  switch (type) {
    case Type["sum == N"]:
      chip = (
        <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-red-300 ring-1 ring-inset ring-red-300">
          {"sum == N"}
        </span>
      );
      break;

    case Type["sum > N"]:
      chip = (
        <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-300">
          {"sum > N"}
        </span>
      );
      break;
    default:
      chip = (
        <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-300">
          {"sum < N"}
        </span>
      );
      break;
  }
  return (
    <div className="flex gap-2">
      {chip}
      <span>{log}</span>
      <span className="text-gray-500">
        {"//"}
        {comment}
      </span>
    </div>
  );
};

export default Log;
