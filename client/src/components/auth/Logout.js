import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { userActions } from "../../store/user-slice";
import { logOut } from "../../util/http";
import ValidationMessage from "../UI/ValidationMessage";

const Logout = (props) => {
  const dispatch = useDispatch();
  const { mutate, isError, error } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      dispatch(userActions.resetUserInfo());
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <>
      {React.cloneElement(props.children, { onClick: handleClick })}
      {isError && (
        <ValidationMessage
          message={error.info?.message || "Failed to log out."}
        />
      )}
    </>
  );
};

export default Logout;
