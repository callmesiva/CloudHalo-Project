import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import ProtectedRoute from "./Component/ProtectedRoute";

const AppLayout = () => (
  <Provider store={store}>
    <Outlet />
  </Provider>
);

const AppProvider = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppProvider} />);
