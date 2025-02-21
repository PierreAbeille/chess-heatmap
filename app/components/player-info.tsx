"use client"

import { PlayerInfoProps } from "../types/player-info";
import { motion } from "framer-motion";

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ white, black }) => {
    return (
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between w-full px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-full border border-gray-600"></div>
          <span className="font-semibold">{white}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded-full border border-gray-600"></div>
          <span className="font-semibold">{black}</span>
        </div>
      </motion.div>
    );
  };