import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

import styles from "./MainNavigation.module.css";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import AuthenticationPage from "../pages/Authentication";
import { uiActions } from "../store/ui-slice";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const authIsVisible = useSelector((state) => state.ui.authIsVisible);

  const handleLoginClick = () => {
    dispatch(uiActions.setAuthIsVisible(true));
  };

  const handleConfirm = () => {
    dispatch(uiActions.setAuthIsVisible(false));
  };

  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link to="/">yop</Link>
        </h1>
        <Button onClick={handleLoginClick}>Log In</Button>
      </header>
      <AnimatePresence>
        {authIsVisible && (
          <Modal onConfirm={handleConfirm}>
            <AuthenticationPage />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNavigation;
