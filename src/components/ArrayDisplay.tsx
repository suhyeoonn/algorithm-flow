import React from "react";

const ArrayDisplay = ({
  length,
  disabledNum,
}: {
  length: number;
  disabledNum: number;
}) => {
  const array = Array.from({ length }, (_, i) => i + 1);
  return (
    <div className="flex gap-[5px]">
      {array.map((n) => (
        <div
          key={n}
          className={`w-10 h-10 leading-10 text-center border ${
            n >= disabledNum
              ? "border-gray-700 text-gray-700"
              : "border-gray-400"
          } rounded-lg`}
        >
          {n}
        </div>
      ))}
    </div>
  );
};

export default ArrayDisplay;
