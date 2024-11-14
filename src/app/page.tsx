"use client";
import ArrayDisplay from "@/components/ArrayDisplay";
import { BlueChip, GreenChip, RedChip } from "@/components/Chip";
import DownArrow from "@/components/icons/DownArrow";
import UpArrow from "@/components/icons/UpArrow";
import Log from "@/components/Log";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useReducer } from "react";

const MOVE = 40 + 5; // width + gap
const N = 10; // TODO: 15로 변경하면 로그가 이상하게 표시된다
const numbers = Array.from({ length: N }, (_, i) => i + 1);

interface State {
  sum: number;
  start: number;
  end: number;
  log: ReactNode[];
}

type Action = { type: 0 } | { type: 1 } | { type: 2 };

const initialState: State = {
  sum: 0,
  start: 1,
  end: 1,
  log: [],
};

const formatRangeSum = (start: number, end: number) =>
  numbers.slice(start, end).join(" + ");

const getSumHistory = (start: number, end: number) =>
  formatRangeSum(start, end) + " = " + getSum(start, end);

const getSum = (start: number, end: number) =>
  numbers.slice(start, end).reduce((sum, n) => sum + n);

const getChip = (start: number, end: number) => {
  if (getSum(start - 1, end) === N) {
    return <RedChip>sum == N</RedChip>;
  } else if (getSum(start - 1, end) > N) {
    return <BlueChip>{"sum > N"}</BlueChip>;
  } else {
    return <GreenChip>{"sum < N"}</GreenChip>;
  }
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 0:
      return {
        ...state,
        sum: state.sum + state.end,
        end: state.end + 1,
        log: [
          ...state.log,
          <Log key={`${state.start}_${state.end}`}>
            <>
              <span>sum: {getSumHistory(state.start - 1, state.end)}</span>
              {getChip(state.start, state.end)}
            </>
          </Log>,
        ],
      };
    case 1:
      return {
        ...state,
        sum: state.sum - state.start,
        start: state.start + 1,
        log: [
          ...state.log,
          <Log key={`${state.start}_${state.end}`}>
            <>
              <span>sum: {getSumHistory(state.start - 1, state.end)}</span>
              {getChip(state.start, state.end)}
            </>
          </Log>,
        ],
      };
    case 2:
      return {
        ...state,
        sum: state.sum + state.end,
        end: state.end + 1,
        log: [
          ...state.log,
          <Log key={`${state.start}_${state.end}`}>
            <>
              <span>sum: {getSumHistory(state.start - 1, state.end)}</span>
              {getChip(state.start, state.end)}
            </>
          </Log>,
        ],
      };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sum, start, end, log } = state;

  useEffect(() => {
    const interval = setInterval(() => {
      if (start == N) {
        clearInterval(interval);
        return;
      }

      if (sum === N) {
        dispatch({ type: 0 });
      } else if (sum > N) {
        dispatch({ type: 1 });
      } else if (sum < N) {
        dispatch({ type: 2 });
      }
    }, 1500);

    return () => clearInterval(interval); // Cleanup으로 interval을 정리
  }, [end, sum, start]);

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
        className="absolute top-[-50px] flex flex-col justify-center items-center left-[1px]"
        animate={{
          x: (start - 1) * MOVE,
          transition: { duration: 1 },
        }}
      >
        start
        <UpArrow />
      </motion.div>
      <ArrayDisplay length={N + 1} disabledNum={N + 1} />
      <motion.div
        className="absolute bottom-[-50px] flex flex-col justify-center items-center left-[5px]"
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
