import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import styles from "./NewPost.module.css";
import { createPost, queryClient } from "../../util/http";
import PostForm from "./PostForm";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import ModalHeader from "../UI/ModalHeader";
import ValidationMessage from "../UI/ValidationMessage";

const NewPost = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useSelector((state) => state.user.userInfo);
  const { mutate, isError, error, reset, isSuccess } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setIsVisible(false);
    },
  });

  const handleClick = () => {
    // document.body.style.overflow = "hidden";
    reset();
    setIsVisible(true);
  };

  const handleConfirm = () => {
    // document.body.style.overflow = "visible";
    setIsVisible(false);
  };

  const handleSubmit = (formData) => {
    mutate({ ...formData, userId: id });
  };

  const handleExitComplete = () => {
    isSuccess && queryClient.invalidateQueries({ queryKey: ["post"] });
  };

  return (
    <>
      {React.cloneElement(props.children, { onClick: handleClick })}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isVisible && (
          <Modal onConfirm={handleConfirm} theme={"post-detail"}>
            <ModalHeader onConfirm={handleConfirm} />
            <div className={styles["modal-post-form"]}>
              <PostForm onSubmit={handleSubmit}>
                <Button type="submit" theme={"post"}>
                  Post
                </Button>
                {/* <Link to="" className="button-text">Cancel</Link> */}
              </PostForm>
            </div>
            <div className={styles["valid-msg-box"]}>
              {isError && (
                <ValidationMessage
                  message={
                    error.info?.message ||
                    "Failed to create post. Please check your inputs and try again later."
                  }
                />
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewPost;
