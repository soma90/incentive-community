import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "./Card.module.css";

const Card = ({ theme, toArr, onClick, ...props }) => {
  const themes = new Map([
    ["top", true],
    ["all", true],
  ]);

  let classes = styles.card;
  if (themes.get(theme)) classes += " " + styles[theme];

  return (
    <motion.div
      className={classes}
      layout
      whileHover={{ borderColor: "var(--color-line-hover)" }}
      whileTap={{ scale: 0.9 }}
      exit={{ y: -30, opacity: 0 }}
    >
      <Link to={toArr} onClick={onClick}>
        {props.children}
      </Link>
    </motion.div>
  );
};

export default Card;
