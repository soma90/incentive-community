import { AnimatePresence, motion } from "framer-motion";
import styles from "./ListVertical.module.css";

const ListVertical = ({
  currentListLength,
  fallbackContent,
  animation,
  ...props
}) => {
  return (
    <motion.article className={styles["list-vertical"]}>
      <AnimatePresence mode="wait" initial={false}>
        {currentListLength > 0 && (
          <motion.ul key="list" {...animation}>
            <AnimatePresence>{props.children}</AnimatePresence>
          </motion.ul>
        )}

        {currentListLength === 0 && (
          <motion.p key="fallback" {...animation}>
            {fallbackContent}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default ListVertical;
