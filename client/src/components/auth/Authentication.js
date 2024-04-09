import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import styles from "./Authentication.module.css";
import { userActions } from "../../store/user-slice";
import { createUser, logIn } from "../../utils/http";
import AuthForm from "./AuthForm";
import ModalHeader from "../UI/ModalHeader";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import ValidationMessage from "../UI/ValidationMessage";
import { getRandomInt } from "../../utils/util";

const Authentication = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: signupData,
    mutate: signupMutate,
    isError: signupIsError,
    error: signupError,
    isSuccess: signupIsSuccess,
    reset: signupReset,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      setIsVisible(false);
    },
  });
  const {
    data: loginData,
    mutate: loginMutate,
    isError: loginIsError,
    error: loginError,
    isSuccess: loginIsSuccess,
    reset: loginReset,
  } = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      setIsVisible(false);
    },
  });
  //const { variants, variantsClickHandler, clickedElement } = useMoveVariants();

  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";

  //메세지 설정
  let validMsg =
    loginError?.info?.message ||
    "Failed to login. Please check your inputs and try again later.";
  if (isSignUp)
    validMsg =
      signupError?.info?.message ||
      "Failed to create user. Please check your inputs and try again later.";

  const handleClick = () => {
    setIsVisible(true);
    loginReset();
    signupReset();
    /* variantsClickHandler({
      element: event.currentTarget.parentNode,
      openVariant: { top: "25vh", maxHeight: 400, backgroundColor: "#fff" },
      closeVariant: { backgroundColor: "var(--primary-color)" },
    }); */
  };

  const handleConfirm = () => {
    setIsVisible(false);
  };

  const handleSubmit = (formData) => {
    isSignUp &&
      signupMutate({ nickname: formData.name, password: formData.password });
    !isSignUp &&
      loginMutate({ nickname: formData.name, password: formData.password });
  };

  const handleModeClick = () => {
    loginReset();
    signupReset();
  };

  const handleExitComplete = () => {
    if (!signupIsSuccess && !loginIsSuccess) return;

    let userInfo = {};
    if (loginData) userInfo = { ...loginData.data };
    else if (signupData) userInfo = { ...signupData.data };

    navigate(
      `/user/${userInfo.id}_${userInfo.nickname}/${getRandomInt(1, 10000)}`,
      {
        replace: true,
      }
    );
    //clickedElement && (clickedElement.style.opacity = 1)
  };

  useEffect(() => {
    return () => {
      if (!loginData && !signupData) return;
      //화면이동 애니메이션이 끝난 후 프로필의 유저 데이터를 업데이트
      dispatch(
        userActions.setUserInfo({
          id: loginData?.data.id ?? signupData?.data.id,
          nickname: loginData?.data.nickname ?? signupData?.data.nickname,
          tokenAmount:
            loginData?.data.token_amount ?? signupData?.data.token_amount,
          ethAmount: loginData?.data.eth_amount ?? signupData?.data.eth_amount,
          createdAt: loginData?.data.createdAt ?? signupData?.data.createdAt,
        })
      );
    };
  }, [loginData, signupData, dispatch]);

  return (
    <div>
      {React.cloneElement(props.children, { onClick: handleClick })}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isVisible && (
          <Modal onConfirm={handleConfirm}>
            <ModalHeader onConfirm={handleConfirm} />
            <AuthForm
              isSignUp={isSignUp}
              onModeClick={handleModeClick}
              onSubmit={handleSubmit}
            >
              <Button
                type="submit"
                theme="max-width"
                //disabled={isSubmitting}
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </Button>
              {(signupIsError || loginIsError) && (
                <ValidationMessage
                  className={styles["valid-msg"]}
                  message={validMsg}
                />
              )}
            </AuthForm>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Authentication;
