import { Link } from "react-router-dom";
import { stagger, useAnimate } from "framer-motion";

import styles from "./AuthForm.module.css";
import useInput from "../../hooks/useInput";
import { isNotEmpty } from "../../utils/validation";
import LabelInput from "../UI/LabelInput";
import ValidationMessage from "../UI/ValidationMessage";

const AuthForm = ({ isSignUp, onModeClick, onSubmit, children }) => {
  const [scope, animate] = useAnimate();

  const {
    value: nameValue,
    hasError: nameHasError,
    didEdit: nameDidEdit,
    setDidEdit: setNameDidEdit,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: passwordValue,
    hasError: passwordHasError,
    didEdit: passwordDidEdit,
    setDidEdit: setPasswordDidEdit,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput("", (value) => isNotEmpty(value));

  //에러 메세지 설정
  let userNameErrMsg = "";
  if (nameHasError) userNameErrMsg = "Fill out this field";

  let passwordErrMsg = "";
  if (passwordHasError) passwordErrMsg = "Fill out this field";

  const handleSubmit = (event) => {
    event.preventDefault();

    //한번도 입력하지 않고 로그인, 회원가입 할 경우
    if (!nameDidEdit || !passwordDidEdit) {
      setNameDidEdit(true);
      setPasswordDidEdit(true);
      return;
    }

    //입력 에러 확인 후 에레메세지 출력과 흔들리는 애니메이션 실행
    let errInputClasses = [];
    if (nameHasError) errInputClasses.push(".name-box");
    if (passwordHasError) errInputClasses.push(".password-box");

    if (errInputClasses.length > 0) {
      animate(
        errInputClasses.join(","),
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    //데이터 전송
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    onSubmit && onSubmit(data);
  };

  return (
    <div className={styles["auth-form"]}>
      <form
        method="post"
        onSubmit={handleSubmit}
        className={styles.form}
        ref={scope}
      >
        <h1>{isSignUp ? "Sign Up" : "Log in"}</h1>
        <div className={"name-box"}>
          <LabelInput
            id="name"
            type="name"
            name="name"
            label="Username *"
            value={nameValue}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            hasError={nameHasError}
          />
        </div>
        <div className={styles["error-msg-box"]}>
          <ValidationMessage isError={nameHasError} message={userNameErrMsg} />
        </div>
        <div className={"password-box"}>
          <LabelInput
            id="password"
            type="password"
            name="password"
            label="Password *"
            value={passwordValue}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            hasError={passwordHasError}
          />
        </div>
        <div className={styles["error-msg-box"]}>
          <ValidationMessage
            isError={passwordHasError}
            message={passwordErrMsg}
          />
        </div>
        <div className={styles.actions}>
          {isSignUp && (
            <>
              <span>Already a yopper? </span>
              <Link to={"?mode=login"} onClick={onModeClick}>
                Login
              </Link>
            </>
          )}
          {!isSignUp && (
            <>
              <span>New to yop? </span>
              <Link to={"?mode=signup"} onClick={onModeClick}>
                Sign Up
              </Link>
            </>
          )}
        </div>
        <div className={styles["form-actions"]}>{children}</div>
      </form>
    </div>
  );
};

export default AuthForm;
