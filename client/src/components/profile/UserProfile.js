import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./UserProfile.module.css";
import { faFaceGrimace } from "@fortawesome/free-regular-svg-icons";
import { faCakeCandles, faCoins } from "@fortawesome/free-solid-svg-icons";
import { getRandomInt } from "../../util/util";
import Button from "../UI/Button";
import NewPost from "../post/NewPost";

const MotionLink = motion(Link);

const UserProfile = ({ userInfo }) => {
  return (
    <div className={styles["user-profile"]}>
      <section className={styles["pic-box"]}>
        <div>
          <FontAwesomeIcon
            className={styles.face}
            icon={faFaceGrimace}
            size="2xl"
          />
        </div>
      </section>
      <h2 className={styles.name}>
        <MotionLink
          to={`/user/${userInfo.id}_${userInfo.nickname}/${getRandomInt(
            1,
            10000
          )}`}
          whileHover={{ boxShadow: "0 1px 0 #1c1c1c" }}
        >
          {userInfo.nickname}
        </MotionLink>
      </h2>
      <section className={styles["info-box"]}>
        <div className={styles["token-box"]}>
          <div className={styles.title}>Token</div>
          <div className={styles["icon-box"]}>
            <FontAwesomeIcon icon={faCoins} />
            <span>{userInfo.tokenAmount}</span>
          </div>
        </div>
        <div className={styles["cake-box"]}>
          <div className={styles.title}>Cake day</div>
          <div className={styles["icon-box"]}>
            <FontAwesomeIcon icon={faCakeCandles} />
            <span>
              {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>
      <section>
        <p className={`${styles.desc} ${styles.title}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi felis
          eros, pharetra non lectus eu, ultricies posuere leo. Curabitur sit
          amet nisl et mi consequat auctor. Aliquam vitae porta eros. Donec
          porttitor rutrum lobortis. Etiam tempus mauris finibus purus
          ullamcorper cursus. Ut efficitur gravida blandit.
        </p>
      </section>
      <NewPost>
        <Button theme="profile">New Post</Button>
      </NewPost>
    </div>
  );
};

export default UserProfile;
