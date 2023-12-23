import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Textarea.module.css";

const Textarea = ({ value, onChange, ...props }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    onChange && onChange();
  };

  useEffect(() => {
    if (value !== undefined) setText(value);
  }, [value]);

  useLayoutEffect(() => {
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, []);

  return (
    <div className={styles["textarea-box"]}>
      <textarea
        className={`${styles["text-area"]} ${
          props.maxLength ? styles["have-max-length"] : ""
        }`}
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        {...props}
      />
      {props.maxLength !== undefined && (
        <div
          className={styles["text-length"]}
        >{`${text.length}/${props.maxLength}`}</div>
      )}
    </div>
  );
};

export default Textarea;
