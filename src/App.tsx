import "./App.css";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ApiClient, queryClient } from "./API/apiClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/User/Login/login";
import { useTest } from "./API/hooks/useTest";
import Register from "./pages/User/Register/Register";
import UserList from "./pages/User/UserList/UserList";
import TopBar from "./components/shell/TopBar";
import Edit from "./pages/User/User/Edit";
import Show from "./pages/User/User/Show";
import { useGetUser } from "./API/hooks/UserHooks";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { mainTheme } from "./styles/theme";
import Home from "./pages/Home/Home";
import "./styles/typography.css";
import Test from "./pages/Test";
// const Test = () => {
//   const query = useTest();
//   return <div>{query.isLoading ? "Loading...." : query.data?.message}</div>;
// };
const router = createBrowserRouter([
  {
    path: "/",
    element: <TopBar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
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
      <ThemeProvider theme={mainTheme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
*{
  /* outline: 1px solid red; */
  &::-webkit-scrollbar {
      border-radius: 20px; /* roundness of the scroll thumb */
      width: 10px; /* width of the entire scrollbar */
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 20px; /* roundness of the scroll thumb */
      background: color-mix(in oklch, transparent, ${({ theme }) =>
        theme.colors.primary[100]} 75%); /* color of the tracking area */
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) =>
        theme.colors.primary[200]}; /* color of the scroll thumb */
      border-radius: 20px; /* roundness of the scroll thumb */
      border: 4px solid transparent; /* creates padding around scroll thumb */
    }
}
  body {
    color: ${(props) => props.theme.colors.dark};
    background-color: color-mix(in oklab, ${(props) =>
      props.theme.colors.light} 30%, white);
    font-family: ${(props) => props.theme.fontFamily} !important;
    color: ${(props) => props.theme.colors.primary["800"]};

    overflow: auto;
    scrollbar-gutter: stable;
    padding-right: 10px;
    
  }
  
`;
export default App;
