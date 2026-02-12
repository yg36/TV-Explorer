"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (value.length >= 2 || value.length === 0) {
        onSearch(value);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [value, onSearch]);

  const clearInput = useCallback(() => setValue(""), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl mx-auto min-h-screen"
    >
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="text-indigo-500" size={20} />
      </div>

      <input
        type="text"
        placeholder="Search shows or movies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-12 pr-12 p-4 rounded-2xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 hover:shadow-md transition-all duration-200"
      />

      {/* Clear Button */}
      <AnimatePresence>
        {value && (
          <motion.button
            key="clear"
            onClick={clearInput}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
