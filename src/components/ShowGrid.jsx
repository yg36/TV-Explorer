import ShowCard from "./ShowCard";
import { motion } from "framer-motion";

export default function ShowGrid({ shows, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {shows.map((show) => (
        <ShowCard
          key={show.id}
          show={show}
          onClick={onSelect}
        />
      ))}
    </motion.div>
  );
}
