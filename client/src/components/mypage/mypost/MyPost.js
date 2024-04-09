import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import styles from "./MyPost.module.css";
import { deletePost, fetchPosts, queryClient } from "../../../utils/http";
import MyPostItem from "./MyPostItem";
import Card from "../../UI/Card";
import ListVertical from "../../UI/ListVertical";
import LoadingIndicator from "../../UI/LoadingIndicator";
import ValidationMessage from "../../UI/ValidationMessage";
import { useParams } from "react-router-dom";

const MyPost = () => {
  const [expanded, setExpanded] = useState(null);
  const { userInfo } = useParams();
  const [userId, userName] = userInfo.split("_");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", userId],
    queryFn: ({ signal }) => fetchPosts({ signal, id: userId }),
  });

  const {
    mutate,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });

  const handleViewDetails = (id, event) => {
    event.stopPropagation();
    event.preventDefault();

    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }
      return id;
    });
  };

  const handleDelete = (id, event) => {
    event.stopPropagation();
    event.preventDefault();

    mutate({ id });
    //setPostList((prev) => prev.filter((post) => post.id !== id));
  };

  const animation = {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -30, opacity: 0 },
  };

  let content = <></>;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <div>
        <p>{error.info?.message || "Failed to fetch posts."}</p>
      </div>
    );
  }

  if (data) {
    const postList = data?.data || [];
    content = (
      <>
        {deleteIsError && (
          <ValidationMessage
            message={
              deleteError.info?.message ||
              "Failed to delete post, please try again later."
            }
          />
        )}
        <ListVertical
          currentListLength={postList.length}
          animation={animation}
          fallbackContent={`${userName} hasn't posted anything`}
        >
          {postList.map((el, i) => (
            <li key={el.id} className={styles["post-list"]}>
              <Card theme={i === 0 && "top"}>
                <MyPostItem
                  title={el.title}
                  nickname={el.nickname}
                  content={el.content}
                  createDate={el.createdAt}
                  isExpanded={expanded === el.id}
                  onViewDetails={handleViewDetails.bind(null, el.id)}
                  onDelete={handleDelete.bind(null, el.id)}
                />
              </Card>
            </li>
          ))}
        </ListVertical>
      </>
    );
  }

  return <>{content}</>;

  /* return (
    <motion.article
      className={styles["my-post"]}
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -30, opacity: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <AnimatePresence mode="wait">
        {postList.length > 0 && (
          <motion.ul
            key="post-list"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
          >
            <AnimatePresence>
              {postList.map((el, i) => (
                <li key={el.id}>
                  <Card index={i}>
                    <MyPostItem
                      title={el.title}
                      name={el.name}
                      content={el.content}
                      createDate={el.createDate}
                      isExpanded={expanded === el.id}
                      onViewDetails={handleViewDetails.bind(null, el.id)}
                      onDelete={handleDelete.bind(null, el.id)}
                    />
                  </Card>
                </li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}

        {postList.length === 0 && (
          <motion.p
            key="fallback"
            variants={{
              visible: { y: 0, opacity: 1 },
              hidden: { y: -30, opacity: 0 },
            }}
          >
            nickname hasn't posted anything
          </motion.p>
        )}
      </AnimatePresence>
    </motion.article>
  ); */
};

export default MyPost;
