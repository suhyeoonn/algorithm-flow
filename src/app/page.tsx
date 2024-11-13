"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MOVE = 40 + 4; // width + gap
const N = 10;

//단계

// 	•	start = 1, end = 1
// 	•	sum += end: sum = 1
// 	•	end++: end = 2
// 	•	sum이 N보다 작으므로 다음 단계로 진행.

// 2단계

// 	•	start = 1, end = 2
// 	•	sum += end: sum = 3 (1 + 2)
// 	•	end++: end = 3
// 	•	sum이 N보다 작으므로 다음 단계로 진행.

// 3단계

// 	•	start = 1, end = 3
// 	•	sum += end: sum = 6 (1 + 2 + 3)
// 	•	end++: end = 4
// 	•	sum이 N보다 작으므로 다음 단계로 진행.

// 4단계

// 	•	start = 1, end = 4
// 	•	sum += end: sum = 10 (1 + 2 + 3 + 4)
// 	•	**sum == N**이므로 count++: count = 2
// 	•	sum += end: sum = 15
// 	•	end++: end = 5
// 	•	sum이 N보다 크므로 sum에서 start를 빼기 시작합니다.
export default function Home() {
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);

  // useEffect(() => {
  //   let interval = setInterval(() => setEndX((value) => value + MOVE), 1000);

  //   if (endX + MOVE >= MOVE * 15) clearInterval(interval);

  //   return () => clearInterval(interval);
  // }, [endX]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sum === N) {
        setCount((prevCount) => prevCount + 1);
        setSum((prevSum) => prevSum + end);
        setEnd((prevEnd) => prevEnd + 1);
      } else if (sum > N) {
        setSum((prevSum) => prevSum - start);
        setStart((prevStart) => prevStart + 1);
      } else {
        setSum((prevSum) => prevSum + end);
        setEnd((prevEnd) => prevEnd + 1);
      }

      if (end >= N) {
        clearInterval(interval);
        console.log("최종 count:", count);
      }
    }, 2000);

    return () => clearInterval(interval); // Cleanup으로 interval을 정리
  }, [end, sum, count, start]); // 필요한 상태를 의존성 배열에 추가

  return (
    <div>
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
      <div className="mt-28">
        sum = {sum}; start = {start}; end={end}; count={count}
      </div>
      <div className="flex gap-10 mt-10">
        <div>
          <h3>sum - N: </h3>
          <p>sum = sum - start; start++;</p>
        </div>
        <div>
          <h3>sum - N: </h3>
          <p>sum = end++; sum = sum + end;</p>
        </div>
        <div>
          <h3>sum == N: </h3>
          <p>sum = end++; sum = sum + end; count++</p>
        </div>
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
    </svg>
  );
};
