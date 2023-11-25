import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Tab.module.css";

const Tab = ({ title, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const clickHandler = (index) => {
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
      <div>
        <AnimatePresence mode="wait">
          {React.Children.map(props.children, (child, i) => {
            if (selectedIndex === i) {
              return child;
            }
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tab;
