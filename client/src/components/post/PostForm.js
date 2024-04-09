import { stagger, useAnimate } from "framer-motion";
import styles from "./PostForm.module.css";
import useInput from "../../hooks/useInput";
import { isNotEmpty } from "../../utils/validation";
import Textarea from "../UI/Textarea";
import ValidationMessage from "../UI/ValidationMessage";

const PostForm = ({ inputData, onSubmit, children }) => {
  const [scope, animate] = useAnimate();

  const {
    value: titleValue,
    hasError: titleHasError,
    didEdit: titleDidEdit,
    setDidEdit: setTitleDidEdit,
    handleInputChange: handleTitleChange,
    handleInputBlur: handleTitleBlur,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: contentValue,
    hasError: contentHasError,
    didEdit: contentDidEdit,
    setDidEdit: setContentDidEdit,
    handleInputChange: handleContentChange,
    handleInputBlur: handleContentBlur,
  } = useInput("", (value) => isNotEmpty(value));

  //에러 메세지 설정
  let errField = [];
  if (titleHasError) errField.push("title");
  if (contentHasError) errField.push("content");

  const handleSubmit = (event) => {
    event.preventDefault();

    //한번도 입력하지 않고 포스트 할 경우
    if (!titleDidEdit || !contentDidEdit) {
      setTitleDidEdit(true);
      setContentDidEdit(true);
      return;
    }

    //입력 에러 확인 후 에레메세지 출력과 흔들리는 애니메이션 실행
    let errInputClasses = [];
    if (titleHasError) errInputClasses.push(".title-box");
    if (contentHasError) errInputClasses.push(".content-box");

    if (errInputClasses.length > 0) {
      animate(
        errInputClasses.join(","),
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit && onSubmit({ ...data });
  };

  return (
    <form id="post-form" onSubmit={handleSubmit} ref={scope}>
      <div className={`title-box ${styles.control}`}>
        <Textarea
          id="title"
          name="title"
          rows="1"
          maxLength="300"
          placeholder="Title"
          value={inputData?.title ?? titleValue}
          hasError={titleHasError}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
        />
      </div>
      <div className={`content-box ${styles.control}`}>
        <Textarea
          id="content"
          name="content"
          rows="10"
          maxLength="2000"
          placeholder="Content"
          value={inputData?.content ?? contentValue}
          hasError={contentHasError}
          onChange={handleContentChange}
          onBlur={handleContentBlur}
        />
      </div>
      <div className={styles["form-actions"]}>
        <div className={styles["valid-msg-box"]}>
          {errField.length > 0 && (
            <ValidationMessage
              message={`Fill out ${errField.join(" ")} field`}
            />
          )}
        </div>
        <div>{children}</div>
      </div>
    </form>
  );
};

export default PostForm;
