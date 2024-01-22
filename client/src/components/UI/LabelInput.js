import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./LabelInput.module.css";

const LabelInput = ({
  label,
  hasError,
  onClick,
  onBlur,
  className,
  id,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef();

  let stylesClasses = (className || "")
    .split(" ")
    .map((el) => styles[el])
    .join(" ");

  let focusClass = "";
  if (isFocus || inputRef.current?.value.trim()) focusClass = styles.focus;

  const animation = {
    //whileHover: { scale: 1.02 },
    //animate: { scale: 1 },
    initial: { x: 0 },
    transition: { type: "spring", duration: 0.2 },
  };

  //if (isFocus) animation.animate.scale = 1.02;
  if (hasError)
    animation.animate = {
      ...animation.animate,
      x: [-10, 0, 10, 0],
    };

  const handleClick = (event) => {
    setIsFocus(true);
    onClick && onClick(event);
  };

  const handleBlur = (event) => {
    setIsFocus(false);
    onBlur && onBlur(event);
  };

  return (
    <motion.p
      className={`${styles["input-box"]} ${focusClass} ${stylesClasses}`}
      {...animation}
    >
      <label htmlFor={id} className={`${styles.label} ${focusClass}`}>
        {label}
      </label>
      <input
        ref={inputRef}
        onClick={handleClick}
        onBlur={handleBlur}
        className={`${styles["input"]} ${focusClass}`}
        id={id}
        {...props}
      />
    </motion.p>
  );
};

export default LabelInput;
