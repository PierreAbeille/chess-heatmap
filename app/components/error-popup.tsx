"use client"

import { X } from "lucide-react";
import { useErrorContext } from "../context/error-context";
import { motion } from "framer-motion";

export const ErrorPopup = () => {
    const {error, setError} = useErrorContext();

    if (!error) return null;

    return (
      <motion.div
        className="fixed top-5 left-1/2 min-w-64 transform -translate-x-1/2 flex items-center justify-between bg-red-500 text-white px-4 py-2 rounded-full shadow-lg font-bold font-mono"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <span>{error}</span>
        <button
          onClick={() => setError(null)}
          className="p-2 rounded-full hover:bg-white hover:text-zinc-900 transition-all duration-200"
        >
          <X size={16} />
        </button>
      </motion.div>
    );
}