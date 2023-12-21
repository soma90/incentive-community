import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Tab.module.css";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};

const Tab = ({ title, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const clickHandler = (index) => {
    setDirection(selectedIndex < index ? 1 : -1);
    setSelectedIndex(index);
  };

  return (
    <div className={`Tab ${styles[props.className] || ""}`}>
      <ul className={styles["title-box"]}>
        {title &&
          title.map((el, i) => {
            return (
              <li key={i}>
                <button
                  className={`${styles.title} ${
                    selectedIndex === i ? styles.selected : ""
                  }`}
                  onClick={() => clickHandler(i)}
                  selected={selectedIndex === i}
                >
                  {el}
                </button>
                {selectedIndex === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className={styles["active-tab-indicator"]}
                  />
                )}
              </li>
            );
          })}
      </ul>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        {React.Children.map(props.children, (child, i) => {
          if (selectedIndex === i) {
            return (
              <motion.div
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                /* transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }} */
              >
                {child}
              </motion.div>
            );
          }
        })}
      </AnimatePresence>
    </div>
  );
};

export default Tab;
