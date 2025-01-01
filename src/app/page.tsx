"use client";
import { ArrayAnimation } from "@/components/ArrayAnimation";
import { BlueChip, GreenChip, RedChip } from "@/components/Chip";

import Log from "@/components/Log";
import { Variable } from "@/components/Variable";
import { ReactNode, useEffect, useReducer } from "react";

const N = 10;
const numbers = Array.from({ length: N }, (_, i) => i + 1);

interface State {
  sum: number;
  start: number;
  end: number;
  log: ReactNode[];
}

enum ActionType {
  EQUAL,
  GREATER_THAN,
  LESS_THAN,
}
type Action =
  | { type: ActionType.EQUAL }
  | { type: ActionType.GREATER_THAN }
  | { type: ActionType.LESS_THAN };

const initialState: State = {
  sum: 1,
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
    case ActionType.EQUAL: {
      const nextEnd = state.end + 1;
      return {
        ...state,
        sum: state.sum + nextEnd,
        end: nextEnd,
        log: [
          ...state.log,
          <Log key={`${state.start}_${nextEnd}`}>
            <>
              <span>sum: {getSumHistory(state.start - 1, nextEnd)}</span>
              {getChip(state.start, nextEnd)}
            </>
          </Log>,
        ],
      };
    }
    case ActionType.GREATER_THAN:
      const nextStart = state.start + 1;
      return {
        ...state,
        sum: state.sum - state.start,
        start: nextStart,
        log: [
          ...state.log,
          <Log key={`${nextStart}_${state.end}`}>
            <>
              <span>sum: {getSumHistory(state.start, state.end)}</span>
              {getChip(nextStart, state.end)}
            </>
          </Log>,
        ],
      };
    case ActionType.LESS_THAN: {
      const nextEnd = state.end + 1;
      return {
        ...state,
        sum: state.sum + nextEnd,
        end: nextEnd,
        log: [
          ...state.log,
          <Log key={`${state.start}_${nextEnd}`}>
            <>
              <span>sum: {getSumHistory(state.start - 1, nextEnd)}</span>
              {getChip(state.start, nextEnd)}
            </>
          </Log>,
        ],
      };
    }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sum, start, end, log } = state;

  useEffect(() => {
    dispatch({ type: 2 }); // 초기화 작업
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (start == N) {
        clearInterval(interval);
        return;
      }

      if (sum === N) {
        dispatch({ type: ActionType.EQUAL });
      } else if (sum > N) {
        dispatch({ type: ActionType.GREATER_THAN });
      } else if (sum < N) {
        dispatch({ type: ActionType.LESS_THAN });
      }
    }, 1500);

    return () => clearInterval(interval); // Cleanup으로 interval을 정리
  }, [end, sum, start]);

  return (
    <div className="">
      <div className="flex justify-center">
        <ArrayAnimation start={start} end={end} N={N} />
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
          Logs
        </h2>
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}
