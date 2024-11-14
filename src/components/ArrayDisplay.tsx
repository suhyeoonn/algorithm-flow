import React from "react";

const ArrayDisplay = ({ length }: { length: number }) => {
  const array = Array.from({ length }, (_, i) => i + 1);
  return (
    <div className="flex gap-1">
      {array.map((n) => (
        <div
          key={n}
          className="w-10 h-10 leading-10 text-center border border-gray-400 rounded-lg"
        >
          {n}
        </div>
      ))}
    </div>
  );
};

export default ArrayDisplay;
