"use client";
import Log, { Type } from "@/components/Log";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

const MOVE = 40 + 5; // width + gap
const N = 10;
const numbers = Array.from({ length: N }, (_, i) => i + 1);
export default function Home() {
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [log, setLog] = useState<ReactNode[]>([]);

  const getSums = (start: number, end: number) =>
    numbers.slice(start, end).join(" + ");

  const getSumHistory = (start: number, end: number) =>
    getSums(start, end) +
    " = " +
    numbers.slice(start, end).reduce((sum, n) => sum + n);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sum === N) {
        setCount((prevCount) => prevCount + 1);
        setSum((prevSum) => prevSum + end);
        setEnd((prevEnd) => prevEnd + 1);
        setLog((prevLog) => [
          ...prevLog,
          <Log
            type={Type["sum == N"]}
            log={`sum += ${end}; end++`}
            comment={`sum: ${getSumHistory(start - 1, end)}, end: ${end} -> ${
              end + 1
            }`}
          />,
        ]);
      } else if (sum > N) {
        setSum((prevSum) => prevSum - start);
        setStart((prevStart) => prevStart + 1);
        setLog((prevLog) => [
          ...prevLog,
          <Log
            type={Type["sum > N"]}
            log={`sum -= ${start}; start++;`}
            comment={`sum: ${getSumHistory(start, end)}, start: ${start} -> ${
              start + 1
            }`}
          />,
        ]);
      } else if (sum < N && end < N) {
        setSum((prevSum) => prevSum + end);
        setEnd((prevEnd) => prevEnd + 1);
        setLog((prevLog) => [
          ...prevLog,
          <Log
            type={Type["sum < N"]}
            log={`sum += ${end}; end++;`}
            comment={`sum: ${getSumHistory(start - 1, end)}, end: ${end} -> ${
              end + 1
            }`}
          />,
        ]);
      }
    }, 2000);

    if (start >= N) {
      clearInterval(interval);
      console.log("최종 count:", count);
    }

    return () => clearInterval(interval); // Cleanup으로 interval을 정리
  }, [end, sum, count, start]); // 필요한 상태를 의존성 배열에 추가

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="relative">
          <motion.div
            className="absolute top-[-50px] flex flex-col justify-center items-center left-0"
            animate={{
              x: (start - 1) * MOVE,
              transition: { duration: 1 },
            }}
          >
            start
            <UpArrow />
          </motion.div>
          <ArrayDisplay />
          <motion.div
            className="absolute bottom-[-50px] flex flex-col justify-center items-center left-0"
            animate={{
              x: (end - 1) * MOVE,
              transition: { duration: 1 },
            }}
          >
            <DownArrow />
            end
          </motion.div>
        </div>
      </div>
      <div className="mt-28 grid grid-cols-3 text-center gap-5">
        <Variable label="sum" value={sum} />
        <Variable label="start" value={start} />
        <Variable label="end" value={end} />
      </div>
      <div className="text-gray-500">SUM: {getSums(start - 1, end)}</div>
      <div className="flex flex-col gap-2 mt-10">
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}

const ArrayDisplay = () => {
  const array = Array.from({ length: N }, (_, i) => i + 1);
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

const DownArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="url(#gradient)"
      className="size-6"
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
      />
    </svg>
  );
};

const UpArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="bg-color-red"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 text-sky-500"
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
    </svg>
  );
};

const Variable = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="border border-gray-500 py-2 rounded-lg">
      <h3 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-500">
        {label}
      </h3>
      <p className="text-lg">{value}</p>
    </div>
  );
};
