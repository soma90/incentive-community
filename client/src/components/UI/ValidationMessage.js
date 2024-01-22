import styles from "./ValidationMessage.module.css";

const ValidationMessage = ({ isError = true, message, className }) => {
  return (
    <p
      className={`${styles["val-msg"]} ${
        isError ? styles["error"] : ""
      } ${className}`}
    >
      {message}
    </p>
  );
};

export default ValidationMessage;
