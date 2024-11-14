import React, { ReactNode } from "react";

export const RedChip = ({ children }: { children: ReactNode }) => {
  return (
    <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-red-300 ring-1 ring-inset ring-red-300">
      {children}
    </span>
  );
};

export const BlueChip = ({ children }: { children: ReactNode }) => {
  return (
    <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-300">
      {children}
    </span>
  );
};

export const GreenChip = ({ children }: { children: ReactNode }) => {
  return (
    <span className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-300">
      {children}
    </span>
  );
};
