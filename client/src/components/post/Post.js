import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import styles from "./Post.module.css";
import { uiActions } from "../../store/ui-slice";
import { fetchPosts } from "../../util/http";
import useMoveVariants from "../../hooks/useMoveVariants";
import Card from "../UI/Card";
import ListVertical from "../UI/ListVertical";
import Modal from "../UI/Modal";
import LoadingIndicator from "../UI/LoadingIndicator";
import PostItem from "./PostItem";
import PostDetail from "./PostDetail";

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const { variants, variantsClickHandler, clickedElement } = useMoveVariants();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post"],
    queryFn: ({ signal }) => fetchPosts({ signal }),
  });

  const handleClick = (event) => {
    dispatch(uiActions.setModalIsVisible(true));
    variantsClickHandler({
      element: event.currentTarget.parentNode.parentNode,
      openVariant: {
        borderRadius: 0,
        borderWidth: 0,
        overflowY: "scroll",
        // paddingLeft: "0.5rem",
      },
      closeVariant: {
        borderRadius: "4px",
        borderColor: "#ccc",
        borderStyle: "solid",
        borderWidth: 1,
        overflowY: "hidden",
        // paddingLeft: 0,
      },
    });
  };

  const handleConfirm = () => {
    dispatch(uiActions.setModalIsVisible(false));
  };

  const animation = {
    /* initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -30, opacity: 0 }, */
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
      <ListVertical
        currentListLength={postList.length}
        animation={animation}
        fallbackContent={"There hasn't been any post"}
      >
        {postList.map((el, i) => (
          <li key={el.id} className={styles["post-list"]}>
            <Card theme="all" toArr={`?id=${el.id}`} onClick={handleClick}>
              <PostItem
                nickname={el.nickname}
                createDate={el.createdAt}
                title={el.title}
                content={el.content}
                hasMask={true}
              />
            </Card>
          </li>
        ))}
      </ListVertical>
    );
  }

  return (
    <section className={styles.post}>
      {content}
      <AnimatePresence
        onExitComplete={() => {
          clickedElement && (clickedElement.style.opacity = 1);
          navigate("");
        }}
      >
        {modalIsVisible && (
          <Modal
            onConfirm={handleConfirm}
            variants={variants}
            theme={"post-detail"}
          >
            <PostDetail modalVariants={variants} onConfirm={handleConfirm} />
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Post;
