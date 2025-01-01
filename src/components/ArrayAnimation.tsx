import DownArrow from "@/components/icons/DownArrow";
import UpArrow from "@/components/icons/UpArrow";
import { motion } from "framer-motion";
import ArrayDisplay from "./ArrayDisplay";

const MOVE = 40 + 5; // width + gap

export const ArrayAnimation = ({
  start,
  end,
  N,
}: {
  start: number;
  end: number;
  N: number;
}) => {
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
