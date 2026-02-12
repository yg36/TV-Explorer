import { motion } from "framer-motion";

export default function Loader({ text = "Loading..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-10 text-gray-500"
    >
      {text}
    </motion.div>
  );
}
