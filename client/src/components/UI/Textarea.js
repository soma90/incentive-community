import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Textarea.module.css";

const Textarea = ({ value, onChange, hasError, ...props }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const animation = {
    initial: { x: 0 },
    transition: { type: "spring", duration: 0.2 },
  };

  if (hasError)
    animation.animate = {
      ...animation.animate,
      x: [-10, 0, 10, 0],
    };

  const handleChange = (event) => {
    setText(event.target.value);
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    onChange && onChange(event);
  };

  useEffect(() => {
    if (value !== undefined) setText(value);
  }, [value]);

  useLayoutEffect(() => {
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, []);

  return (
    <motion.div className={styles["textarea-box"]} {...animation}>
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
    </motion.div>
  );
};

export default Textarea;
