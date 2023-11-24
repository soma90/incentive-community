import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import PostPage from "./pages/Post";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <PostPage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
