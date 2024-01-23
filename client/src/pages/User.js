import { useSelector } from "react-redux";
import Tab from "../components/UI/Tab";
import MyPost from "../components/mypage/mypost/MyPost";

function UserPage() {
  const { nickname } = useSelector((state) => state.user.userInfo);

  return (
    <section>
      <Tab title={["POSTS", "COMMENTS"]}>
        <MyPost />
        <p>{nickname} hasn't commented on anything</p>
      </Tab>
    </section>
  );
}

export default UserPage;
