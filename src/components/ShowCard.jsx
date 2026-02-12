import { motion } from "framer-motion";

export default function ShowCard({ show, onClick }) {
  const image =
    show.image?.medium ||
    "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(show.id)}
      className="show-card"
    >
      <img
        src={image}
        alt={show.name}
        className="show-card-image"
      />

      <div className="show-card-content">
        <h3 className="show-card-title">
          {show.name}
        </h3>
        <p className="show-card-rating">
          ⭐ {show.rating?.average || "N/A"}
        </p>
      </div>
    </motion.div>
  );
}
