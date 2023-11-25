import ReactDOM from "react-dom";
import { motion } from "framer-motion";

import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={props.onConfirm}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <motion.div
      className={styles.modal}
      initial={{ opacity: 0, y: 50, x: "var(--translate-x-n50)" }}
      animate={{ opacity: 1, y: 0, x: "var(--translate-x-n50)" }}
      exit={{
        opacity: 0,
        y: 50,
        x: "var(--translate-x-n50)",
        transition: { type: "tween" },
      }}
      transition={{ type: "spring", stiffness: 300, exit: { duration: 0.2 } }}
    >
      {props.children}
    </motion.div>
  );
};

const Modal = (props) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");
  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(
          <Backdrop onConfirm={props.onConfirm} />,
          backdropRoot
        )}
      {overlayRoot &&
        ReactDOM.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          overlayRoot
        )}
    </>
  );
};

export default Modal;
