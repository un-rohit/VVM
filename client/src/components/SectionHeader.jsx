import { motion } from "framer-motion";

export default function SectionHeader({ title, subtitle, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {icon !== false && (
        <div className="icon-divider" aria-hidden="true">
          <span className="icon-line" />
          <span className="icon-circle">
            {icon}
          </span>
          <span className="icon-line" />
        </div>
      )}
    </motion.div>
  );
}
