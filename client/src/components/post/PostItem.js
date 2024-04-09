import { useLayoutEffect, useRef, useState } from "react";

import styles from "./PostItem.module.css";
import { timeAgo } from "../../utils/util";

const MAXHEIGHT = 200;

const PostItem = ({ title, nickname, content, createDate, hasMask }) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const mainRef = useRef();

  useLayoutEffect(() => {
    if (hasMask && mainRef.current?.offsetHeight >= MAXHEIGHT)
      setIsOverflow(true);
    else setIsOverflow(false);
  }, [hasMask]);

  return (
    <article className={styles["item-article"]}>
      <header>
        <div className={styles["info-box"]}>
          <p className={styles.name}>{nickname}</p>
          <p className={styles.date}>{timeAgo(createDate)}</p>
        </div>
        <h2 className={styles.title}>{title}</h2>
      </header>
      <main
        ref={mainRef}
        className={`${styles["item-content"]} ${
          isOverflow ? styles.overflow : ""
        }`}
      >
        {content}
      </main>
      <footer className={styles["item-etc"]}></footer>
    </article>
  );
};

export default PostItem;
