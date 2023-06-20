import "./App.css";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ApiClient, queryClient } from "./API/apiClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/User/Login/login";
import { useTest } from "./API/hooks/useTest";
import Register from "./pages/User/Register/Register";
import UserList from "./pages/User/UserList/UserList";
import TopBar from "./components/Table/shell/TopBar";
import Edit from "./pages/User/User/Edit";
import Show from "./pages/User/User/Show";
import { useGetUser } from "./API/hooks/UserHooks";

const Test = () => {
  const query = useTest();
  return <div>{query.isLoading ? "Loading...." : query.data?.message}</div>;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <TopBar></TopBar>,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "users",
        children: [
          { element: <UserList />, index: true },
          {
            path: ":id",
            loader: ({ params }) => {
              if (!params.id) return Promise.reject(new Error("No id"));
              const id = parseInt(params.id);
              return id;
            },
            element: <Show />,
          },
          {
            path: "edit/:id",
            loader: ({ params }) => {
              if (!params.id) return Promise.reject(new Error("No id"));
              const id = parseInt(params.id);
              return id;
            },
            element: <Edit />,
          },
        ],
      },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
