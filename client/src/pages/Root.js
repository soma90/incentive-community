import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "./Root.module.css";
import MainNavigation from "../components/MainNavigation";
import SideNavigation from "../components/SideNavigation";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <section className={styles["root-section"]}>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <Outlet />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
        >
          <SideNavigation />
        </motion.div>
      </main>
    </section>
  );
}

export default RootLayout;
