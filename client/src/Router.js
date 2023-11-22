import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
