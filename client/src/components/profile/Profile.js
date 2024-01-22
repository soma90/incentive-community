import { useSelector } from "react-redux";

import styles from "./Profile.module.css";
import UserProfile from "./UserProfile";
import DefaultProfile from "./DefaultProfile";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className={styles.profile}>
      <header
        className={`${styles["header-box"]} ${
          !userInfo.id ? styles["basic"] : ""
        }`}
      />
      <main className={styles["main-box"]}>
        {!userInfo.id && <DefaultProfile />}
        {!!userInfo.id && <UserProfile userInfo={userInfo} />}
      </main>
    </div>
  );
};

export default Profile;
