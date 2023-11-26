import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

import styles from "./MainNavigation.module.css";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import AuthenticationPage from "../pages/Authentication";
import { uiActions } from "../store/ui-slice";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);

  const handleLoginClick = () => {
    dispatch(uiActions.setModalIsVisible(true));
  };

  const handleConfirm = () => {
    dispatch(uiActions.setModalIsVisible(false));
  };

  return (
    <>
      <header className={styles.header}>
        <h1>yop</h1>
        <Button onClick={handleLoginClick}>Log In</Button>
      </header>
      <AnimatePresence>
        {modalIsVisible && (
          <Modal onConfirm={handleConfirm}>
            <AuthenticationPage />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNavigation;
