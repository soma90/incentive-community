import { motion } from "framer-motion";
import styles from "./Button.module.css";

const Button = ({ theme, children, className, ...props }) => {
  const themes = new Map([
    ["secondary", true],
    ["post", true],
    ["close-x", true],
    ["max-width", true],
    ["profile", true],
  ]);

  let stylesClasses = (className || "")
    .split(" ")
    .map((el) => styles[el])
    .join(" ");

  if (themes.get(theme)) stylesClasses += " " + styles[theme];

  let animation = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };
  if (theme === "max-width" || theme === "profile") {
    animation.whileHover.scale = 1.05;
    animation.whileTap.scale = 0.95;
  }

  return (
    <motion.button
      className={`${styles["button"]} ${stylesClasses}`}
      {...props}
      {...animation}
      // transition={{ type: "spring", stiffness: 300, duration: 0.2 }}
    >
      {children}
      <div className={styles["x-mark"]} />
    </motion.button>
  );
};

export default Button;
