import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";


export default function DetailsDrawer({
  show,
  cast,
  loading,
  castLoading,
  onClose
}) {
  if (!show) return null;

  const image =
    show.image?.original ||
    show.image?.medium ||
    "https://via.placeholder.com/500x700?text=No+Image";

  return (
    <AnimatePresence>
      <motion.div
        className="drawer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="drawer-container"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 110 }}
        >
          <button onClick={onClose} className="drawer-close">
            <X size={22} />
          </button>

          {loading ? (
            <div className="drawer-loading">
              Loading details...
            </div>
          ) : (
            <div className="drawer-content">

              {/* Poster */}
              <div className="drawer-poster">
                <img
                  src={image}
                  alt={show.name}
                  className="drawer-poster-img"
                />
              </div>

              {/* Info */}
              <div className="drawer-info">
                <h2 className="drawer-title">
                  {show.name}
                </h2>

                <div className="drawer-meta">
                  <span>⭐ {show.rating?.average || "N/A"}</span>
                  <span>{show.premiered?.split("-")[0]}</span>
                  <span>{show.genres?.join(", ")}</span>
                </div>

                <div
                  className="drawer-summary"
                  dangerouslySetInnerHTML={{
                    __html: show.summary || "No summary available."
                  }}
                />

                {/* Cast */}
                <div className="drawer-cast">
                  <h3 className="drawer-section-title">
                    Cast
                  </h3>

                  {castLoading ? (
                    <p className="drawer-muted">Loading cast...</p>
                  ) : (
                    <div className="cast-grid">
                      {cast.slice(0, 12).map((member) => (
                        <div
                          key={member.person.id}
                          className="cast-card"
                        >
                          <img
                            src={
                              member.person.image?.medium ||
                              "https://via.placeholder.com/100x150?text=No+Image"
                            }
                            alt={member.person.name}
                            className="cast-image"
                          />

                          <p className="cast-name">
                            {member.person.name}
                          </p>

                          <p className="cast-character">
                            {member.character?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
