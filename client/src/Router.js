import React from "react";
import {
  useRoutes,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import RootLayout from "./pages/Root";
import MainPage from "./pages/Main";
import { AnimatePresence } from "framer-motion";
import UserPage from "./pages/User";

const MyRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: "user/:userInfo/:rNum",
          element: <UserPage />,
        },
      ],
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <AnimatePresence mode="wait" initial={false} >
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
};

export default Router;
