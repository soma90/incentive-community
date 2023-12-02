import ReactDOM from "react-dom";
import { motion } from "framer-motion";

import styles from "./Modal.module.css";

const Backdrop = ({ themeClass, ...props }) => {
  return (
    <motion.div
      className={`${styles.backdrop} ${themeClass}`}
      onClick={props.onConfirm}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};

const ModalOverlay = ({ variants, themeClass, ...props }) => {
  return (
    <motion.div
      className={`${styles.modal} ${themeClass}`}
      variants={{
        open: {
          opacity: 1,
          y: 0,
        },
        closed: {
          opacity: 0,
          y: 50,
        },
      }}
      initial="closed"
      animate="open"
      exit="closed"      
      {...variants}
    >
      {props.children}
    </motion.div>
  );
};

const Modal = ({ variants, theme, ...props }) => {
  const themes = new Map([["post-detail", true]]);
  const themeClass = themes.get(theme) ? styles[theme] : "";
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(
          <Backdrop onConfirm={props.onConfirm} themeClass={themeClass} />,
          backdropRoot
        )}
      {overlayRoot &&
        ReactDOM.createPortal(
          <ModalOverlay variants={variants} themeClass={themeClass}>
            {props.children}
          </ModalOverlay>,
          overlayRoot
        )}
    </>
  );
};

export default Modal;
