"use client"

import { motion } from "framer-motion";
import { useGameContext } from "../context/game-context";

export const PlayersBanner = () => {
    const {playersInfo} = useGameContext();


    return (
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between w-full min-h-16 px-4 pb-8 pt-4 -mb-4 bg-zinc-800 border border-gray-800 text-white rounded-t-2xl shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-full border border-gray-600"></div>
          <span className="font-semibold">{playersInfo.white}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded-full border border-gray-600"></div>
          <span className="font-semibold">{playersInfo.black}</span>
        </div>
      </motion.div>
    );
  };