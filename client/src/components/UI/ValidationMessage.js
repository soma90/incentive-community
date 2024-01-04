import styles from "./ValidationMessage.module.css";

const ValidationMessage = ({ isError, message }) => {
  return (
    <p className={`${styles["val-msg"]} ${isError ? styles["error"] : ""}`}>
      {message}
    </p>
  );
};

export default ValidationMessage;
