import styles from "./DefaultProfile.module.css";

const DefaultProfile = () => {
  return (
    <div className={styles["home-profile"]}>
      <h2 className={styles.title}>Welcome!</h2>
      <section>
        <p className={`${styles.content}`}>
          Nunc posuere mauris ullamcorper ultricies aliquet. Curabitur sodales
          mauris urna, et gravida neque rhoncus nec. Donec egestas elit in nulla
          faucibus, et interdum diam mattis. Nam eleifend augue nec arcu
          eleifend suscipit.
        </p>
      </section>
    </div>
  );
};

export default DefaultProfile;
