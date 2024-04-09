import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";

import styles from "./MyPostItem.module.css";
import { timeAgo } from "../../../utils/util";

const MyPostItem = ({
  title,
  nickname,
  content,
  createDate,
  isExpanded,
  onViewDetails,
  onDelete,
}) => {
  return (
    <div>
      <article className={styles["item-article"]}>
        <section className={styles["icon-box"]}>
          {/* <FontAwesomeIcon icon="fa-regular fa-rectangle-list" /> */}
          <FontAwesomeIcon
            className={styles.faRectangleList}
            icon={faRectangleList}
            //size="1x"
            //flip
          />
        </section>
        <section className={styles["info-section"]}>
          <header>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles["info-box"]}>
              <p className={styles.name}>{nickname}</p>
              <p className={styles.date}>{timeAgo(createDate)}</p>
            </div>
          </header>
          <motion.footer
            className={styles["item-etc"]}
            onPointerDownCapture={(e) => e.stopPropagation()}
          >
            <p>
              <motion.button
                onClick={onViewDetails}
                whileHover={{ boxShadow: "0 1px 0 #1c1c1c" }}
              >
                View Content{" "}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  className={styles["details-icon"]}
                >
                  &#9650;
                </motion.span>
              </motion.button>
            </p>
            <p>
              <motion.button
                onClick={onDelete}
                whileHover={{ boxShadow: "0 1px 0 #1c1c1c" }}
              >
                Delete Content
              </motion.button>
            </p>
          </motion.footer>
        </section>
      </article>
      <article className={styles["content-acticle"]}>
        <AnimatePresence i>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={styles["content-box"]}
            >
              <p className={styles["item-content"]}>{content}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </div>
  );
};

export default MyPostItem;
