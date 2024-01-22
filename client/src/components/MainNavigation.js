import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

import styles from "./MainNavigation.module.css";
import Button from "./UI/Button";
import Authentication from "./auth/Authentication";
import Logout from "./auth/Logout";

const MainNavigation = () => {
  const { nickname } = useSelector((state) => state.user.userInfo);

  return (
    <header className={styles["main-nav"]}>
      <div className={styles["header-box"]}>
        <h1>
          <FontAwesomeIcon icon={faComment} className={styles["logo-icon"]}/>
          <Link to="/">Yop</Link>
        </h1>
        <div>
          {nickname && (
            <Logout>
              <Button>LogOut</Button>
            </Logout>
          )}
          {!nickname && (
            <Authentication>
              <Button>Log In</Button>
            </Authentication>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
