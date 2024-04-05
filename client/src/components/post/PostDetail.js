import { useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PostItem from "./PostItem";
import ModalHeader from "../UI/ModalHeader";
import { useSelector } from "react-redux";

function PostDetail({ onConfirm }) {
  const [searchParams] = useSearchParams();
  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const { data } = useQuery({
    queryKey: ["post"],
  });

  const postId = searchParams.get("id");

  let postData;
  for (const page of data.pages) {
    postData = page.data.find((el) => Number(el.id) === Number(postId));
    if (postData) break;
  }

  if (!postData) postData = [];

  useLayoutEffect(() => {
    document.documentElement.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.scrollbarGutter = "auto";
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <>
      {modalIsVisible && <ModalHeader onConfirm={onConfirm} />}
      <PostItem
        content={postData.content}
        nickname={postData.nickname}
        title={postData.title}
        createDate={postData.createdAt}
      />
    </>
  );
}

export default PostDetail;
