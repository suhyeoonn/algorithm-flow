"use client";
import ArrayDisplay from "@/components/ArrayDisplay";
import { BlueChip, GreenChip, RedChip } from "@/components/Chip";
import DownArrow from "@/components/icons/DownArrow";
import UpArrow from "@/components/icons/UpArrow";
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

  const formatRangeSum = (start: number, end: number) =>
    numbers.slice(start, end).join(" + ");

  const getSumHistory = (start: number, end: number) =>
    formatRangeSum(start, end) + " = " + getSum(start, end);

  const getSum = (start: number, end: number) =>
    numbers.slice(start, end).reduce((sum, n) => sum + n);

  // TODO: useReducer로 바꿀까?
  useEffect(() => {
    const interval = setInterval(() => {
      if (sum === N) {
        setCount((prevCount) => prevCount + 1);
        setSum((prevSum) => prevSum + end);
        setEnd((prevEnd) => prevEnd + 1);
      } else if (sum > N) {
        setSum((prevSum) => prevSum - start);
        setStart((prevStart) => prevStart + 1);
      } else if (sum < N && end < N) {
        setSum((prevSum) => prevSum + end);
        setEnd((prevEnd) => prevEnd + 1);
      }
    }, 2000);

    if (end > N) {
      clearInterval(interval);
      console.log("최종 count:", count);
    }

    setLog((prevLog) => {
      const newLog = [<span>sum: {getSumHistory(start - 1, end)}</span>];
      if (getSum(start - 1, end) === N) {
        newLog.push(<RedChip>sum == N</RedChip>);
      } else if (getSum(start - 1, end) > N) {
        newLog.push(<BlueChip>{"sum > N"}</BlueChip>);
      } else {
        newLog.push(<GreenChip>{"sum < N"}</GreenChip>);
      }
      return [...prevLog, <Log>{...newLog}</Log>];
    });

    return () => clearInterval(interval); // Cleanup으로 interval을 정리
  }, [end, sum, count, start]); // 필요한 상태를 의존성 배열에 추가

  return (
    <div className="">
      <div className="flex justify-center">
        <ArrayAnimation start={start} end={end} />
      </div>
      <div className="mt-28 grid grid-flow-col auto-cols-fr text-center gap-5">
        <Variable label="N" value={N} />
        <Variable label="sum" value={sum} />
        <Variable label="start" value={start} />
        <Variable label="end" value={end} />
      </div>
      <div className="text-gray-500">sum: {formatRangeSum(start - 1, end)}</div>
      <div className="flex flex-col gap-2 mt-10">
        <h2 className="text-xl font-bold border-b border-gray-700 pb-2 text-gray-200">
          Log
        </h2>
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}

const ArrayAnimation = ({ start, end }: { start: number; end: number }) => {
  return (
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
      <ArrayDisplay length={N} />
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
