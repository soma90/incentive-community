import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Writer.module.css";
import { socket } from "../../utils/socket";
import { generate } from "../../utils/http";
import { postActions } from "../../store/post-silce";

const Writer = () => {
  const textareaRef = useRef();
  const [textareaVal, setTextareaVal] = useState("");
  const dispatch = useDispatch();
  const newPostContent = useSelector((state) => state.post.newPostContent);

  const { mutate, isError, error, reset, isSuccess, isPending } = useMutation({
    mutationFn: generate,
    onSuccess: () => {
      setTextareaVal("");
    },
  });

  const handleOk = () => {
    socket.connect();
    setTextareaVal("AI is writing.");
    mutate({ prompt: textareaVal });
  };

  const handleStop = () => {
    socket.disconnect();
    reset();
    setTextareaVal("");
  };

  const handleChange = (e) => {
    setTextareaVal(e.target.value);
  };

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("content", (data) => {
      console.log(data);
      dispatch(postActions.setNewPostContentGenerate(data));
    });
    socket.on("end_content", (data) => {
      console.log(data);
    });
    socket.on("disconnect", () => {
      console.log("Server has disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("content");
      socket.off("end_content");
      socket.off("disconnect");
    };
  }, [dispatch]);

  return (
    <>
      <div className={styles.writer}>
        <textarea
          rows={1}
          ref={textareaRef}
          value={textareaVal}
          placeholder="Tell AI what to do"
          onChange={handleChange}
          disabled={isPending}
        />
        {!isPending && (
          <div className={styles["button-box"]}>
            <button>Cancel</button>
            <button onClick={handleOk}>Ok</button>
          </div>
        )}
        {isPending && (
          <div>
            <button onClick={handleStop}>Stop</button>
          </div>
        )}
      </div>
      {/* {React.createElement(
        "textarea",
        "<div>sss</div>"
      )} */}
    </>
  );
};

export default Writer;
