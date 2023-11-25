import styles from "./ModalHeader.module.css";
import Button from "./Button";

const ModalHeader = (props) => {
  return (
    <header className={styles.header}>
      <div>{props.content}</div>
      <Button theme="close-x" onClick={props.onConfirm}/>
    </header>
  );
};

export default ModalHeader;
